'use server'

import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/lib/stripe'

interface CreateSubscription {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

export async function createSubscription({
  customerId,
  priceId,
  metadata,
}: CreateSubscription) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    const supabase = createClient()
    await supabase.from('subscriptions').insert({
      id: subscription.id,
      customer_id: customerId,
      price_id: priceId,
      status: subscription.status,
      metadata: subscription.metadata,
    })

    return { data: subscription, error: null }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return { data: null, error }
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)

    const supabase = createClient()
    await supabase.from('subscriptions')
      .update({ status: subscription.status })
      .eq('id', subscriptionId)

    return { data: subscription, error: null }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return { data: null, error }
  }
}

export async function updateSubscription(subscriptionId: string, priceId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
    })

    const supabase = createClient()
    await supabase.from('subscriptions')
      .update({ 
        price_id: priceId,
        status: updatedSubscription.status,
      })
      .eq('id', subscriptionId)

    return { data: updatedSubscription, error: null }
  } catch (error) {
    console.error('Error updating subscription:', error)
    return { data: null, error }
  }
}