'use server'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import process from 'process'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-26'
})

export async function POST(req: Request) {
  const { priceId } = (await req.json()) as { priceId: string }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/canceled`
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    globalThis.console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}
