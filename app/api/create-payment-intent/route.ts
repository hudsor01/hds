import { NextResponse } from 'next/server'
import { z } from 'zod'
import Stripe from 'stripe'
import { withAuth, withRateLimit } from '../lib/middleware'
import { handleError } from '../lib/error-handler'
import { validateRequest } from '../lib/validation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PaymentIntentSchema = z.object({
  amount: z.number().positive(),
  propertyId: z.string().uuid()
})

export async function POST(request: Request) {
  try {
    return await withRateLimit(async (req: Request) => {
      return await withAuth(req, async user => {
        const validatedData = await validateRequest(PaymentIntentSchema, req)

        const paymentIntent = await stripe.paymentIntents.create({
          amount: validatedData.amount * 100,
          currency: 'usd',
          metadata: {
            propertyId: validatedData.propertyId,
            userId: user.id
          }
        })

        return NextResponse.json({
          clientSecret: paymentIntent.client_secret
        })
      })
    })(request)
  } catch (error) {
    return handleError(error)
  }
}
