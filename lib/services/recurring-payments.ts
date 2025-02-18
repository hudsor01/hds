'use server'

import { stripe } from '@/lib/stripe'
import supabase from '@/lib/supabase'

interface CreateSubscription {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

export async function createSubscription({ customerId, priceId, metadata }: CreateSubscription) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    })
    const createResponse = await supabase
      .from('subscriptions')
      .insert<{ id: string; customer_id: string; price_id: string; status: string; metadata: Record<string, string> }>({
        id: subscription.id,
        customer_id: customerId,
        price_id: priceId,
        status: subscription.status,
        metadata: subscription.metadata
      })
      .select()
    const { data, error: insertError } = createResponse
    if (insertError !== null) {
      console.error('Error inserting subscription:', insertError)
      return { data: null, error: insertError }
    }

    return { data: data[0] || null, error: null }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return { data: null, error }
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    const updateResponse = await supabase
      .from('subscriptions')
      .update({ status: subscription.status })
      .eq('id', subscriptionId)
      .select()
    const { data: updatedData, error: updateError } = updateResponse
    if (updateError !== null) {
      console.error('Error updating subscription:', updateError)
      return { data: null, error: updateError }
    }

    return { data: updatedData, error: null }
    return { data: updateResult.data, error: null }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return { data: null, error }
  }
}
