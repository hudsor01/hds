'use server'

import { stripe } from '@/lib/stripe'
import { Database } from '@/types/supabase'

type PaymentMethod = 'card' | 'bank_transfer'

interface CreatePaymentIntent {
    amount: number
    currency: string
    paymentMethod: PaymentMethod
    description?: string
    metadata?: Record<string, string>
}

export async function createPaymentIntent({
    amount,
    currency,
    paymentMethod,
    description,
    metadata
}: CreatePaymentIntent) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: [paymentMethod],
            description,
            metadata
        })

        return { data: paymentIntent, error: null }
    } catch (error) {
        console.error('Error creating payment intent:', error)
        return { data: null, error }
    }
}

export async function getPaymentMethods(customerId: string) {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card'
        })

        return { data: paymentMethods.data, error: null }
    } catch (error) {
        console.error('Error getting payment methods:', error)
        return { data: null, error }
    }
}
