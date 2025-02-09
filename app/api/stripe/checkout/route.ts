import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const checkoutSchema = z.object({
  session_id: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const result = checkoutSchema.safeParse({
      session_id: searchParams.get('session_id'),
    })

    if (!result.success) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    const { session_id } = result.data

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'subscription'],
    })

    if (!session.customer || typeof session.customer === 'string') {
      throw new Error('Invalid customer data from Stripe.')
    }

    const customerId = session.customer.id
    const subscriptionId =
      typeof session.subscription === 'string' ? session.subscription : session.subscription?.id

    if (!subscriptionId) {
      throw new Error('No subscription found for this session.')
    }

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    })

    const plan = subscription.items.data[0]?.price
    if (!plan || typeof plan.product === 'string') {
      throw new Error('Invalid plan data from Stripe.')
    }

    const product = plan.product as Stripe.Product

    // Get user from session
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new Error('User not authenticated.')
    }

    // Update user subscription in database
    await prisma.subscriptions.upsert({
      where: {
        user_id_product_id: {
          user_id: user.id,
          product_id: product.id,
        },
      },
      update: {
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        subscription_status: subscription.status,
        subscription_type: product.name,
        active_until: new Date(subscription.current_period_end * 1000),
        updated_at: new Date(),
      },
      create: {
        user_id: user.id,
        product_id: product.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        subscription_status: subscription.status,
        subscription_type: product.name,
        active_until: new Date(subscription.current_period_end * 1000),
      },
    })

    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        stripe_customer_id: customerId,
        subscription_status: subscription.status,
        subscription_type: product.name,
      },
    })

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Error handling checkout:', error)
    return NextResponse.redirect(new URL('/error?message=subscription-failed', request.url))
  }
}
