import {supabase} from '@/lib/supabase';
import {auth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';
import {z} from 'zod';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not defined.');
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia',
});

const paymentSchema = z.object({
  tenant_id: z.string().uuid('Invalid tenant ID'),
  property_id: z.string().uuid('Invalid property ID'),
  lease_id: z.string().uuid('Invalid lease ID'),
  payment_amount: z.number().positive('Payment amount must be positive'),
  payment_type: z.enum(['RENT', 'DEPOSIT', 'LATE_FEE', 'MAINTENANCE', 'UTILITIES', 'OTHER']),
  payment_method: z.enum(['CASH', 'CHECK', 'CREDIT_CARD', 'BANK_TRANSFER', 'OTHER']),
  payment_date: z.string().datetime(),
  payment_notes: z.string().optional(),
  payment_status: z
    .enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'])
    .default('PENDING'),
});

export async function GET(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const searchParams = req.nextUrl.searchParams;
    const property_id = searchParams.get('property_id');
    const tenant_id = searchParams.get('tenant_id');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    let query = supabase
      .from('payments')
      .select('*, tenants(*), properties(*)')
      .order('payment_date', {ascending: false});

    if (property_id) {
      query = query.eq('property_id', property_id);
    }

    if (tenant_id) {
      query = query.eq('tenant_id', tenant_id);
    }

    if (status) {
      query = query.eq('payment_status', status);
    }

    if (type) {
      const allowedPaymentTypes = [
        'RENT',
        'DEPOSIT',
        'LATE_FEE',
        'MAINTENANCE',
        'UTILITIES',
        'OTHER',
      ];
      if (allowedPaymentTypes.includes(type)) {
        query = query.eq('payment_type', type);
      } else {
        console.warn(`Invalid payment type provided: ${type}. Filter has been ignored.`);
      }
    }

    const {data: payments, error} = await query;

    if (error) {
      console.error('Error fetching payments:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: payments});
  } catch (error) {
    console.error('Error in payment GET route:', error);
    return NextResponse.json({error: 'Failed to fetch payments'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = paymentSchema.parse(body);

    // Verify property ownership and tenant/lease association
    const {data: property, error: propertyError} = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('user_id', userId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
    }

    const {data: tenant, error: tenantError} = await supabase
      .from('tenants')
      .select('id')
      .eq('id', validatedData.tenant_id)
      .eq('user_id', userId)
      .single();

    if (tenantError || !tenant) {
      return NextResponse.json({error: 'Tenant not found or unauthorized'}, {status: 404});
    }

    const {data: lease, error: leaseError} = await supabase
      .from('leases')
      .select('id')
      .eq('id', validatedData.lease_id)
      .eq('user_id', userId)
      .single();

    if (leaseError || !lease) {
      return NextResponse.json({error: 'Lease not found or unauthorized'}, {status: 404});
    }

    let paymentIntent;
    if (validatedData.payment_method === 'CREDIT_CARD') {
      // Create Stripe PaymentIntent for credit card payments
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(validatedData.payment_amount * 100), // Convert to cents
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          tenant_id: validatedData.tenant_id,
          property_id: validatedData.property_id,
          lease_id: validatedData.lease_id,
          payment_type: validatedData.payment_type,
        },
      });
    }

    const {data: payment, error} = await supabase
      .from('payments')
      .insert([
        {
          ...validatedData,
          payment_intent_id: paymentIntent?.id,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for new payment
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'PAYMENT',
        title: 'New Payment Created',
        message: `A new ${validatedData.payment_type} payment of $${validatedData.payment_amount} has been created`,
        data: {
          payment_id: payment.id,
          amount: validatedData.payment_amount,
          type: validatedData.payment_type,
          status: validatedData.payment_status,
        },
      },
    ]);

    return NextResponse.json(
      {
        data: {
          ...payment,
          client_secret: paymentIntent?.client_secret,
        },
      },
      {status: 201},
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in payment POST route:', error);
    return NextResponse.json({error: 'Failed to create payment'}, {status: 500});
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const {id, ...updateData} = body;

    if (!id) {
      return NextResponse.json({error: 'Payment ID is required'}, {status: 400});
    }

    const validatedData = paymentSchema.partial().parse(updateData);

    // Verify payment ownership
    const {data: existingPayment, error: paymentCheckError} = await supabase
      .from('payments')
      .select('payment_status, payment_intent_id')
      .eq('id', id)
      .single();

    if (paymentCheckError || !existingPayment) {
      return NextResponse.json({error: 'Payment not found or unauthorized'}, {status: 404});
    }

    // Prevent updates to completed or refunded payments
    if (
      existingPayment.payment_status === 'COMPLETED' ||
      existingPayment.payment_status === 'REFUNDED'
    ) {
      return NextResponse.json(
        {error: 'Cannot update completed or refunded payments'},
        {status: 400},
      );
    }

    // Handle Stripe payment status updates if necessary
    if (validatedData.payment_status === 'REFUNDED' && existingPayment.payment_intent_id) {
      await stripe.refunds.create({
        payment_intent: existingPayment.payment_intent_id,
      });
    }

    const {data: payment, error} = await supabase
      .from('payments')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for payment status update
    if (validatedData.payment_status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'PAYMENT',
          title: 'Payment Status Updated',
          message: `Payment status updated to ${validatedData.payment_status}`,
          data: {
            payment_id: id,
            old_status: existingPayment.payment_status,
            new_status: validatedData.payment_status,
          },
        },
      ]);
    }

    return NextResponse.json({data: payment});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in payment PUT route:', error);
    return NextResponse.json({error: 'Failed to update payment'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({error: 'Payment ID is required'}, {status: 400});
    }

    // Verify payment ownership and status
    const {data: payment, error: paymentCheckError} = await supabase
      .from('payments')
      .select('payment_status, payment_intent_id')
      .eq('id', id)
      .single();

    if (paymentCheckError || !payment) {
      return NextResponse.json({error: 'Payment not found or unauthorized'}, {status: 404});
    }

    // Prevent deletion of completed or refunded payments
    if (payment.payment_status === 'COMPLETED' || payment.payment_status === 'REFUNDED') {
      return NextResponse.json(
        {error: 'Cannot delete completed or refunded payments'},
        {status: 400},
      );
    }

    // Cancel Stripe payment intent if it exists
    if (payment.payment_intent_id) {
      await stripe.paymentIntents.cancel(payment.payment_intent_id);
    }

    const {error} = await supabase.from('payments').delete().eq('id', id);

    if (error) {
      console.error('Error deleting payment:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Payment deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error in payment DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete payment'}, {status: 500});
  }
}
