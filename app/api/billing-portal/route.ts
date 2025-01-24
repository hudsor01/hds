import { authOptions } from '@/auth'

import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { stripe } from '@/auth/lib/stripe'

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer ID found' }, { status: 400 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: session.user.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({ url: portalSession.url });
}
