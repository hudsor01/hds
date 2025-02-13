import { NextResponse } from 'next/server'
import { supabase } from '@supabase/ssr'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const supabase = supabase()
  const {
    data: { user }
  } = await supabase.auth.getSession()
  const { amount, propertyId } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: { propertyId, userId: user.id }
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
