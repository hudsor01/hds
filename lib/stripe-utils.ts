import { supabase } from '@/lib/supabase/auth'
import type { Stripe } from 'stripe'

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    // Update subscription data in your database
    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        plan_id: subscription.items.data.length > 0 ? (subscription.items.data[0]?.plan?.id ?? null) : null
      })
      .eq('id', subscription.id)
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  try {
    // Update invoice data in your database
    await supabase
      .from('invoices')
      .update({
        paid: invoice.paid,
        status: invoice.status,
        amount_paid: invoice.amount_paid,
        amount_remaining: invoice.amount_remaining,
        hosted_invoice_url: invoice.hosted_invoice_url
      })
      .eq('id', invoice.id)
  } catch (error) {
    console.error('Error updating invoice:', error)
    throw error
  }
}

export async function handleStripeWebhook(event: Stripe.Event, signature: string): Promise<void> {
  try {
    // Verify webhook signature
    const isValid = await supabase.rpc('verify_stripe_webhook', {
      payload: JSON.stringify(event),
      stripe_signature: signature
    })

    if (!isValid) {
      throw new Error('Invalid webhook signature')
    }

    // Log webhook event
    await supabase.from('stripe_webhook_events').insert({
      id: event.id,
      type: event.type,
      data: event.data.object
    })

    // Handle specific event types
    switch (event.type) {
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object)
        break
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object)
        break
    }
  } catch (error) {
    console.error('Error handling Stripe webhook:', error)
    throw error
  }
}
