import { getStripe } from '../../../utils/stripe/client'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Session } from '@supabase/supabase-js'

type SessionWithUser = Session & {
  user: {
    stripe_customer_id?: string | null
  }
}

export async function POST(): Promise<NextResponse> {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.user?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer ID found' }, { status: 400 })
  }

  const stripe = await getStripe()
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: session.user.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
  })

  return NextResponse.json({ url: portalSession.url })
}
