import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request): Promise<NextResponse> {
  const supabase = supabase()
  const {
    data: { user }
  } = await supabase.auth.getSession()
  const { amount, propertyId }: { amount: number; propertyId: string } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: { propertyId, userId: user.id }
  })

  return NextResponse.json({ clientSecret: paymentIntent.client_secret })
}
