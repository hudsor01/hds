import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await prisma.users.update({
          where: { id: session.client_reference_id! },
          data: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: 'active'
          }
        })
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        await prisma.users.update({
          where: { stripeCustomerId: invoice.customer as string },
          data: {
            subscriptionStatus: 'active'
          }
        })
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        await prisma.users.update({
          where: { stripeCustomerId: failedInvoice.customer as string },
          data: {
            subscriptionStatus: 'past_due'
          }
        })
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
