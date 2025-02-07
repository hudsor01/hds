import {stripe} from '@/lib/payments/stripe';
import {supabase} from '@/lib/supabase';
import type {PaymentMethodType} from '@/types/payments';
import {auth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

// Validation schemas for different payment method types
const cardSchema = z.object({
  type: z.literal('card'),
  payment_method_id: z.string(),
});

const achSchema = z.object({
  type: z.literal('ach_debit'),
  ach_debit: z.object({
    bank_name: z.string(),
    routing_number: z.string(),
    account_number: z.string(),
    account_type: z.enum(['checking', 'savings']),
    account_holder_type: z.enum(['individual', 'company']),
  }),
});

const checkSchema = z.object({
  type: z.literal('check'),
  check: z.object({
    bank_name: z.string(),
    account_holder: z.string(),
    check_number: z.string().optional(),
    routing_number: z.string().optional(),
    account_number: z.string().optional(),
  }),
});

const cashSchema = z.object({
  type: z.literal('cash'),
  cash: z.object({
    receipt_number: z.string().optional(),
    received_by: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const bankTransferSchema = z.object({
  type: z.literal('bank_transfer'),
  bank_transfer: z.object({
    bank_name: z.string(),
    account_holder: z.string(),
    swift_bic: z.string().optional(),
    iban: z.string().optional(),
    routing_number: z.string().optional(),
    account_number: z.string().optional(),
    reference: z.string().optional(),
  }),
});

export async function POST(req: NextRequest, {params}: {params: {type: PaymentMethodType}}) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();

    let paymentMethod;
    switch (params.type) {
      case 'card':
        const cardData = cardSchema.parse(body);
        // Attach card payment method to customer in Stripe
        const stripeMethod = await stripe.paymentMethods.attach(cardData.payment_method_id, {
          customer: userId, // Assuming userId is the Stripe customer ID
        });
        paymentMethod = {
          type: 'card',
          status: 'active',
          created_at: new Date().toISOString(),
          card: {
            brand: stripeMethod.card!.brand,
            last4: stripeMethod.card!.last4,
            exp_month: stripeMethod.card!.exp_month,
            exp_year: stripeMethod.card!.exp_year,
            funding: stripeMethod.card!.funding,
          },
        };
        break;

      case 'ach_debit':
        const achData = achSchema.parse(body);
        // Store ACH details
        paymentMethod = {
          type: 'ach_debit',
          status: 'pending_verification',
          created_at: new Date().toISOString(),
          ach_debit: {
            ...achData.ach_debit,
            last4: achData.ach_debit.account_number.slice(-4),
            status: 'pending',
          },
        };
        break;

      case 'check':
        const checkData = checkSchema.parse(body);
        paymentMethod = {
          type: 'check',
          status: 'active',
          created_at: new Date().toISOString(),
          check: checkData.check,
        };
        break;

      case 'cash':
        const cashData = cashSchema.parse(body);
        paymentMethod = {
          type: 'cash',
          status: 'active',
          created_at: new Date().toISOString(),
          cash: cashData.cash,
        };
        break;

      case 'bank_transfer':
        const bankData = bankTransferSchema.parse(body);
        paymentMethod = {
          type: 'bank_transfer',
          status: 'active',
          created_at: new Date().toISOString(),
          bank_transfer: bankData.bank_transfer,
        };
        break;

      default:
        return NextResponse.json({error: 'Unsupported payment method type'}, {status: 400});
    }

    // Save payment method to database
    const {data, error} = await supabase
      .from('payment_methods')
      .insert([
        {
          user_id: userId,
          ...paymentMethod,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving payment method:', error);
      return NextResponse.json({error: 'Failed to save payment method'}, {status: 500});
    }

    return NextResponse.json({data});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in payment method POST route:', error);
    return NextResponse.json({error: 'Failed to create payment method'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest, {params}: {params: {type: PaymentMethodType}}) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({error: 'Payment method ID is required'}, {status: 400});
    }

    // If it's a card payment method, detach from Stripe
    if (params.type === 'card') {
      const {data: paymentMethod, error: fetchError} = await supabase
        .from('payment_methods')
        .select('stripe_payment_method_id')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching payment method:', fetchError);
        return NextResponse.json({error: 'Failed to fetch payment method'}, {status: 500});
      }

      if (paymentMethod.stripe_payment_method_id) {
        await stripe.paymentMethods.detach(paymentMethod.stripe_payment_method_id);
      }
    }

    // Delete from database
    const {error} = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting payment method:', error);
      return NextResponse.json({error: 'Failed to delete payment method'}, {status: 500});
    }

    return NextResponse.json({message: 'Payment method deleted successfully'});
  } catch (error) {
    console.error('Error in payment method DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete payment method'}, {status: 500});
  }
}
