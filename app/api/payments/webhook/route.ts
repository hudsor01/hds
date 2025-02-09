import { stripe } from '@/lib/payments/stripe'
import { updatePaymentStatus } from '@/lib/services/payments'
import { NextRequest, NextResponse } from 'next/server'
import type { Stripe } from 'stripe'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await updatePaymentStatus(paymentIntent.metadata.paymentId, 'COMPLETED', event)
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await updatePaymentStatus(paymentIntent.metadata.paymentId, 'FAILED', event)
        break
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        if (charge.payment_intent) {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            charge.payment_intent as string
          )
          await updatePaymentStatus(paymentIntent.metadata.paymentId, 'REFUNDED', event)
        }
        break
      }
      // Add more event handlers as needed
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Failed to handle webhook event' }, { status: 500 })
  }
}

// Disable body parsing, we need the raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
