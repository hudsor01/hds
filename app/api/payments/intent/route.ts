import { createPaymentIntent } from '@/lib/services/payments'
import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const paymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3).default('usd'),
  payment_method_types: z.array(z.string()).default(['card']),
  description: z.string().optional(),
  metadata: z.record(z.string()).optional()
})

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: unknown = await req.json()
    const validatedData = paymentIntentSchema.parse(body)

    const paymentIntent = await createPaymentIntent({
      ...validatedData,
      metadata: {
        ...validatedData.metadata,
        userId: user.id
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create payment intent'
      },
      { status: 500 }
    )
  }
}
