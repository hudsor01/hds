import { stripe } from '@/lib/payments/stripe'
import { updatePaymentStatus } from '@/lib/services/payments'
import { supabase } from '@/lib/supabase/auth'
import { NextRequest, NextResponse } from 'next/server'
import type { Stripe } from 'stripe'
import { z } from 'zod'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
}

// Define event types
const StripeEventType = z.enum([
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'charge.refunded',
  'charge.dispute.created',
  'charge.dispute.closed',
  'payment_method.attached',
  'payment_method.detached'
] as const)

type StripeEventType = z.infer<typeof StripeEventType>

interface PaymentNotification {
  user_id: string
  type: 'PAYMENT' | 'DISPUTE'
  title: string
  message: string
  data: Record<string, string | number | null>
}

// Type guards for Stripe objects
function isPaymentIntent(obj: Stripe.Event.Data.Object): obj is Stripe.PaymentIntent {
  return (obj as Stripe.PaymentIntent).object === 'payment_intent'
}

function isCharge(obj: Stripe.Event.Data.Object): obj is Stripe.Charge {
  return (obj as Stripe.Charge).object === 'charge'
}

function isDispute(obj: Stripe.Event.Data.Object): obj is Stripe.Dispute {
  return (obj as Stripe.Dispute).object === 'dispute'
}

function isPaymentMethod(obj: Stripe.Event.Data.Object): obj is Stripe.PaymentMethod {
  return (obj as Stripe.PaymentMethod).object === 'payment_method'
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Validate event type
    const eventType = StripeEventType.parse(event.type)

    switch (eventType) {
      case 'payment_intent.succeeded':
        if (isPaymentIntent(event.data.object)) {
          await handlePaymentIntentSucceeded(event.data.object)
        }
        break

      case 'payment_intent.payment_failed':
        if (isPaymentIntent(event.data.object)) {
          await handlePaymentIntentFailed(event.data.object)
        }
        break

      case 'charge.refunded':
        if (isCharge(event.data.object)) {
          await handleChargeRefunded(event.data.object)
        }
        break

      case 'charge.dispute.created':
        if (isDispute(event.data.object)) {
          await handleDisputeCreated(event.data.object)
        }
        break

      case 'charge.dispute.closed':
        if (isDispute(event.data.object)) {
          await handleDisputeClosed(event.data.object)
        }
        break

      case 'payment_method.attached':
        if (isPaymentMethod(event.data.object)) {
          await handlePaymentMethodAttached(event.data.object)
        }
        break

      case 'payment_method.detached':
        if (isPaymentMethod(event.data.object)) {
          await handlePaymentMethodDetached(event.data.object)
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    if (error instanceof stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Webhook handler failed' }, { status: 500 })
  }
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent & {
    charges?: { data: Array<Stripe.Charge> }
  }
) {
  await updatePaymentStatus(paymentIntent.id, 'succeeded', {
    amount: paymentIntent.amount / 100,
    payment_method: paymentIntent.payment_method,
    receipt_url: paymentIntent.charges?.data[0]?.receipt_url ?? null
  })

  const notification: PaymentNotification = {
    user_id: paymentIntent.metadata.userId,
    type: 'PAYMENT',
    title: 'Payment Successful',
    message: `Payment of $${paymentIntent.amount / 100} was successful`,
    data: {
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount / 100
    }
  }

  const { error } = await supabase.from('notifications').insert([notification])
  if (error) {
    console.error('Error inserting notification:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const error = paymentIntent.last_payment_error

  await updatePaymentStatus(paymentIntent.id, 'failed', {
    error_message: error?.message ?? null,
    error_code: error?.code ?? null,
    decline_code: error?.decline_code ?? null
  })

  const notification: PaymentNotification = {
    user_id: paymentIntent.metadata.userId,
    type: 'PAYMENT',
    title: 'Payment Failed',
    message: error?.message || 'Payment attempt failed',
    data: {
      payment_intent_id: paymentIntent.id,
      error_code: error?.code ?? null
    }
  }

  const { error: supabaseError } = await supabase.from('notifications').insert([notification])
  if (supabaseError) {
    console.error('Error inserting notification:', supabaseError)
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  if (charge.payment_intent) {
    const refundReason = charge.refunds?.data[0]?.reason
    await updatePaymentStatus(charge.payment_intent as string, 'refunded', {
      refund_amount: charge.amount_refunded / 100,
      refund_reason: refundReason ?? null
    })

    const notification: PaymentNotification = {
      user_id: charge.metadata.userId,
      type: 'PAYMENT',
      title: 'Payment Refunded',
      message: `Refund of $${charge.amount_refunded / 100} was processed`,
      data: {
        charge_id: charge.id,
        amount: charge.amount_refunded / 100
      }
    }

    const { error } = await supabase.from('notifications').insert([notification])
    if (error) {
      console.error('Error inserting notification:', error)
    }
  }
}

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  const { data: payment, error } = await supabase
    .from('payments')
    .update({
      dispute_status: 'pending',
      dispute_reason: dispute.reason,
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', dispute.payment_intent)
    .select()
    .single()

  if (error) {
    console.error('Error updating payment:', error)
    return
  }

  const notification: PaymentNotification = {
    user_id: payment.user_id,
    type: 'DISPUTE',
    title: 'Payment Disputed',
    message: `A dispute has been filed for payment of $${dispute.amount / 100}`,
    data: {
      dispute_id: dispute.id,
      reason: dispute.reason
    }
  }

  const { error: supabaseError } = await supabase.from('notifications').insert([notification])
  if (supabaseError) {
    console.error('Error inserting notification:', supabaseError)
  }
}

async function handleDisputeClosed(dispute: Stripe.Dispute) {
  const { data: payment, error } = await supabase
    .from('payments')
    .update({
      dispute_status: dispute.status,
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', dispute.payment_intent)
    .select()
    .single()

  if (error) {
    console.error('Error updating payment:', error)
    return
  }

  const notification: PaymentNotification = {
    user_id: payment.user_id,
    type: 'DISPUTE',
    title: 'Dispute Resolved',
    message: `The dispute for payment of $${dispute.amount / 100} has been ${dispute.status}`,
    data: {
      dispute_id: dispute.id,
      status: dispute.status
    }
  }

  const { error: supabaseError } = await supabase.from('notifications').insert([notification])
  if (supabaseError) {
    console.error('Error inserting notification:', supabaseError)
  }
}

async function handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
  const { error } = await supabase
    .from('payment_methods')
    .update({
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_payment_method_id', paymentMethod.id)

  if (error) {
    console.error('Error updating payment method:', error)
  }
}

async function handlePaymentMethodDetached(paymentMethod: Stripe.PaymentMethod) {
  const { error } = await supabase
    .from('payment_methods')
    .update({
      status: 'inactive',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_payment_method_id', paymentMethod.id)

  if (error) {
    console.error('Error updating payment method:', error)
  }
}

// Disable body parsing, we need the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false
  }
} as const
