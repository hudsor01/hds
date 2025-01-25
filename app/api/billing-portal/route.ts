import { auth } from '@/auth/lib/auth'
import { stripe } from '@/auth/lib/stripe'
import { Session } from 'next-auth'
import { NextResponse } from 'next/server'

type SessionWithUser = Session & {
  user: {
    stripe_customer_id?: string | null
  }
}

export async function POST() {
  const session = (await auth()) as SessionWithUser

  if (!session?.user?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer ID found' }, { status: 400 })
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: session.user.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return NextResponse.json({ url: portalSession.url })
}
