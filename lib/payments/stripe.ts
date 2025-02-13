import type { Team } from '@/types/team'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { getCurrentUser } from '../../app/auth'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
  appInfo: {
    name: 'HDS Platform',
    version: '1.0.0'
  }
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function createCheckoutSession({
  team,
  priceId
}: {
  team: Team | null
  priceId: string
}) {
  const user = await getCurrentUser(supabase)

  if (!team || !user) {
    redirect(`/sign-up?redirect=checkout&priceId=${priceId}`)
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/pricing`,
    customer: team.stripeCustomerId || undefined,
    client_reference_id: user.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14
    }
  })

  redirect(session.url!)
}

export async function createCustomerPortalSession(team: Team) {
  if (!team.stripeCustomerId || !team.stripeProductId) {
    redirect('/pricing')
  }

  let configuration: Stripe.BillingPortal.Configuration
  const configurations = await stripe.billingPortal.configurations.list()

  if (configurations.data.length > 0) {
    configuration = configurations.data[0]
  } else {
    const product = await stripe.products.retrieve(team.stripeProductId)
    if (!product.active) {
      throw new Error("Team's product is not active in Stripe")
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true
    })
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the team's product")
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: 'Manage your subscription'
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'quantity', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: [
            {
              product: product.id,
              prices: prices.data.map(price => price.id)
            }
          ]
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: ['too_expensive', 'missing_features', 'switched_service', 'unused', 'other']
          }
        }
      }
    })
  }

  return stripe.billingPortal.sessions.create({
    customer: team.stripeCustomerId,
    return_url: `${process.env.BASE_URL}/dashboard`,
    configuration: configuration.id
  })
}

export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const subscriptionId = subscription.id
  const status = subscription.status

  const team = getTeamByStripeCustomerId(customerId)

  if (!team) {
    console.error('Team not found for Stripe customer:', customerId)
    return
  }

  if (status === 'active' || status === 'trialing') {
    const plan = subscription.items.data[0]?.plan
    updateTeamSubscription(team.id, {
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status
    })
  } else if (status === 'canceled' || status === 'unpaid') {
    updateTeamSubscription(team.id, {
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status
    })
  }
}

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring'
  })

  return prices.data.map(price => ({
    id: price.id,
    productId: typeof price.product === 'string' ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days
  }))
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })

  return products.data.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === 'string' ? product.default_price : product.default_price?.id
  }))
}

function getTeamByStripeCustomerId(customerId: string): Team | null {
  throw new Error('Function not implemented.')
}

function updateTeamSubscription(
  id: unknown,
  data: {
    stripeSubscriptionId: string | null
    stripeProductId: string | null
    planName: string | null
    subscriptionStatus: 'active' | 'trialing' | 'canceled' | 'unpaid'
  }
) {
  throw new Error('Function not implemented.')
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true
})

export interface CreateCustomerParams {
  email: string
  name: string
  metadata: Record<string, string>
}

export interface CreatePaymentIntentParams {
  amount: number
  currency?: string
  customer: string
  metadata: Record<string, string>
}

export const createStripeCustomer = async ({ email, name, metadata }: CreateCustomerParams) => {
  return stripe.customers.create({
    email,
    name,
    metadata
  })
}

export const createPaymentIntent = async ({
  amount,
  currency = 'usd',
  customer,
  metadata
}: CreatePaymentIntentParams) => {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    customer,
    metadata,
    automatic_payment_methods: {
      enabled: true
    }
  })
}

// Webhook utilities
export const constructWebhookEvent = (
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) => {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

// Customer utilities
export const retrieveCustomer = async (customerId: string) => {
  return stripe.customers.retrieve(customerId)
}

export const updateCustomer = async (customerId: string, data: Stripe.CustomerUpdateParams) => {
  return stripe.customers.update(customerId, data)
}

// Payment utilities
export const retrievePaymentIntent = async (paymentIntentId: string) => {
  return stripe.paymentIntents.retrieve(paymentIntentId)
}

export const cancelPaymentIntent = async (paymentIntentId: string) => {
  return stripe.paymentIntents.cancel(paymentIntentId)
}

// Subscription utilities
export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) => {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata
  })
}

export const cancelSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.cancel(subscriptionId)
}
