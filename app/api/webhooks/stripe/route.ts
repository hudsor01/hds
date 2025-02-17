import { getHeaders } from '@/utils/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await getHeaders()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return new NextResponse('No signature', { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer as string
        const subscriptionId = subscription.id
        const status = subscription.status

        // Update subscription in database
        await prisma.subscriptions.updateMunknown({
          where: {
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId
          },
          data: {
            subscription_status: status,
            active_until: new Date(subscription.current_period_end * 1000),
            updated_at: new Date()
          }
        })

        break
      }

      case 'customer.deleted': {
        const customer = event.data.object

        // Remove customer data from subscriptions
        await prisma.subscriptions.updateMunknown({
          where: { stripe_customer_id: customer.id },
          data: {
            stripe_customer_id: null,
            stripe_subscription_id: null,
            subscription_status: 'cancelled',
            updated_at: new Date()
          }
        })

        break
      }

      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const status = event.type === 'invoice.payment_succeeded' ? 'active' : 'past_due'

        if (invoice.subscription) {
          await prisma.subscriptions.updateMunknown({
            where: { stripe_subscription_id: invoice.subscription as string },
            data: {
              subscription_status: status,
              updated_at: new Date()
            }
          })
        }

        break
      }
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error handling Stripe webhook:', error)
    return new NextResponse('Webhook error: ' + (error instanceof Error ? error.message : 'Unknown error'), { status: 400 })
  }
}
