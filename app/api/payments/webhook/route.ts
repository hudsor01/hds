import { stripe } from '@/lib/payments/stripe'
import { updatePaymentStatus } from '@/lib/services/payments'
import supabase from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import type { Stripe } from 'stripe'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    const paymentIntent = event.data.object as Stripe.PaymentIntent & {
      charges?: { data: Array<Stripe.Charge> }
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge)
        break

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute)
        break

      case 'charge.dispute.closed':
        await handleDisputeClosed(event.data.object as Stripe.Dispute)
        break

      case 'payment_method.attached':
        await handlePaymentMethodAttached(event.data.object as Stripe.PaymentMethod)
        break

      case 'payment_method.detached':
        await handlePaymentMethodDetached(event.data.object as Stripe.PaymentMethod)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    if (error instanceof stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
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
    receipt_url: paymentIntent.charges?.data[0]?.receipt_url
  })

  // Create notification
  await supabase.from('notifications').insert([
    {
      user_id: paymentIntent.metadata.userId,
      type: 'PAYMENT',
      title: 'Payment Successful',
      message: `Payment of $${paymentIntent.amount / 100} was successful`,
      data: {
        payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount / 100
      }
    }
  ])
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const error = paymentIntent.last_payment_error

  await updatePaymentStatus(paymentIntent.id, 'failed', {
    error_message: error?.message,
    error_code: error?.code,
    decline_code: error?.decline_code
  })

  await supabase.from('notifications').insert([
    {
      user_id: paymentIntent.metadata.userId,
      type: 'PAYMENT',
      title: 'Payment Failed',
      message: error?.message || 'Payment attempt failed',
      data: {
        payment_intent_id: paymentIntent.id,
        error_code: error?.code
      }
    }
  ])
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  if (charge.payment_intent) {
    const refundReason = charge.refunds?.data?.[0]?.reason
    await updatePaymentStatus(charge.payment_intent as string, 'refunded', {
      refund_amount: charge.amount_refunded / 100,
      refund_reason: refundReason
    })

    await supabase.from('notifications').insert([
      {
        user_id: charge.metadata.userId,
        type: 'PAYMENT',
        title: 'Payment Refunded',
        message: `Refund of $${charge.amount_refunded / 100} was processed`,
        data: {
          charge_id: charge.id,
          amount: charge.amount_refunded / 100
        }
      }
    ])
  }
}

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  const { data: payment } = await supabase
    .from('payments')
    .update({
      dispute_status: 'pending',
      dispute_reason: dispute.reason,
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', dispute.payment_intent)
    .select()
    .single()

  await supabase.from('notifications').insert([
    {
      user_id: payment.user_id,
      type: 'DISPUTE',
      title: 'Payment Disputed',
      message: `A dispute has been filed for payment of $${dispute.amount / 100}`,
      data: {
        dispute_id: dispute.id,
        reason: dispute.reason
      }
    }
  ])
}

async function handleDisputeClosed(dispute: Stripe.Dispute) {
  const { data: payment } = await supabase
    .from('payments')
    .update({
      dispute_status: dispute.status,
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', dispute.payment_intent)
    .select()
    .single()

  await supabase.from('notifications').insert([
    {
      user_id: payment.user_id,
      type: 'DISPUTE',
      title: 'Dispute Resolved',
      message: `The dispute for payment of $${dispute.amount / 100} has been ${dispute.status}`,
      data: {
        dispute_id: dispute.id,
        status: dispute.status
      }
    }
  ])
}

async function handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
  await supabase
    .from('payment_methods')
    .update({
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_payment_method_id', paymentMethod.id)
}

async function handlePaymentMethodDetached(paymentMethod: Stripe.PaymentMethod) {
  await supabase
    .from('payment_methods')
    .update({
      status: 'inactive',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_payment_method_id', paymentMethod.id)
}

// Disable body parsing, we need the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false
  }
}
