import { createPaymentIntent } from '@/lib/services/payments';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const paymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3).default('usd'),
  payment_method_types: z.array(z.string()).default(['card']),
  description: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = paymentIntentSchema.parse(body);

    const paymentIntent = await createPaymentIntent({
      ...validatedData,
      metadata: {
        ...validatedData.metadata,
        userId,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error creating payment intent:', error);
    return NextResponse.json({error: 'Failed to create payment intent'}, {status: 500});
  }
}
