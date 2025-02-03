import {prisma} from '@/lib/prisma';
import {getAuth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';
import {z} from 'zod';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

const createPaymentSchema = z.object({
  amount: z.number().positive(),
  tenantId: z.string().min(1),
  propertyId: z.string().min(1),
  dueDate: z.string().optional(),
  leaseId: z.string().optional(),
  method: z.enum(['CREDIT_CARD', 'BANK_TRANSFER', 'CASH', 'CHECK']).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const json = await req.json();
    const body = createPaymentSchema.parse(json);

    // Verify the property belongs to the user
    const property = await prisma.properties.findFirst({
      where: {
        id: body.propertyId,
        owner_id: userId,
      },
    });

    if (!property) {
      return new NextResponse('Property not found', {status: 404});
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        tenantId: body.tenantId,
        propertyId: body.propertyId,
      },
    });

    const payment = await prisma.payments.create({
      data: {
        amount: body.amount,
        tenant_id: body.tenantId,
        property_id: body.propertyId,
        reference: paymentIntent.id,
        status: 'Pending',
        user_id: userId,
        lease_id: body.leaseId || '',
        due_date: body.dueDate ? new Date(body.dueDate) : new Date(),
        method: body.method || null,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.user_id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), {status: 400});
    }
    console.error('POST /api/payments error:', error);
    return new NextResponse('Internal Error', {status: 500});
  }
}

export async function GET(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const {searchParams} = new URL(req.url);
    const propertyId = searchParams.get('propertyId');
    const tenantId = searchParams.get('tenantId');
    const status = searchParams.get('status') as
      | 'Pending'
      | 'Paid'
      | 'Overdue'
      | 'Cancelled'
      | undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = {
      ...(propertyId && {property_id: propertyId}),
      ...(tenantId && {tenant_id: tenantId}),
      ...(status && {status}),
      property: {
        owner_id: userId,
      },
    };

    const [payments, total] = await Promise.all([
      prisma.payments.findMany({
        where,
        include: {
          tenant: true,
          property: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.payments.count({where}),
    ]);

    return NextResponse.json({
      payments,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/payments error:', error);
    return new NextResponse('Internal Error', {status: 500});
  }
}
