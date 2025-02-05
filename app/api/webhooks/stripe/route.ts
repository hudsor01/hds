import {prisma} from '@/lib/db/prisma/prisma';
import {stripe} from '@/lib/stripe';
import type {PaymentRecord} from '@/types/payments';
import {PaymentStatus, PaymentType} from '@prisma/client';
import {headers} from 'next/headers';
import {NextResponse} from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return new NextResponse('Missing stripe-signature header', {status: 400});
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new NextResponse('Missing webhook secret', {status: 500});
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new NextResponse('Webhook signature verification failed', {status: 400});
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const {leaseId, paymentType} = paymentIntent.metadata;

        // Update payment record
        await prisma.payments.updateMany({
          where: {
            payment_intent_id: paymentIntent.id,
          },
          data: {
            payment_status: PaymentStatus.PAID,
            processed_at: new Date(),
          },
        });

        // Update lease payment status if it's a rent payment
        if (paymentType === PaymentType.RENT) {
          await prisma.leases.update({
            where: {
              user_id: leaseId,
            },
            data: {
              status: 'PAID',
            },
          });
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment record
        await prisma.payments.updateMany({
          where: {
            payment_intent_id: paymentIntent.id,
          },
          data: {
            payment_status: PaymentStatus.FAILED,
            error_message: paymentIntent.last_payment_error?.message,
          },
        });

        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment record
        await prisma.payments.updateMany({
          where: {
            payment_intent_id: paymentIntent.id,
          },
          data: {
            payment_status: PaymentStatus.CANCELLED,
          },
        });

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;

        // Record the invoice payment
        if (invoice.subscription) {
          const tenant = await prisma.tenants.findFirst({
            where: {
              stripe_customer_id: invoice.customer as string,
            },
          });

          if (tenant) {
            const paymentRecord: PaymentRecord = {
              tenant_id: tenant.id,
              payment_amount: invoice.amount_paid / 100,
              payment_status: PaymentStatus.PAID,
              payment_type: PaymentType.SUBSCRIPTION,
              description: `Subscription payment for period ${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}`,
              payment_intent_id: invoice.payment_intent as string,
              processed_at: new Date(),
            };

            await prisma.payments.create({data: paymentRecord});
          }
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        // Record the failed payment
        if (invoice.subscription) {
          const tenant = await prisma.tenants.findFirst({
            where: {
              stripe_customer_id: invoice.customer as string,
            },
          });

          if (tenant) {
            const paymentRecord: PaymentRecord = {
              tenant_id: tenant.id,
              payment_amount: invoice.amount_due / 100,
              payment_status: PaymentStatus.FAILED,
              payment_type: PaymentType.SUBSCRIPTION,
              description: 'Failed subscription payment',
              payment_intent_id: invoice.payment_intent as string,
              error_message: (invoice as any).last_payment_error?.message,
            };

            await prisma.payments.create({data: paymentRecord});

            // Update tenant subscription status
            await prisma.tenants.update({
              where: {
                id: tenant.id,
              },
              data: {
                subscription_status: 'PAST_DUE',
              },
            });
          }
        }

        break;
      }

      default:
        return new NextResponse(`Unsupported event type: ${event.type}`, {
          status: 400,
        });
    }

    return new NextResponse('Webhook processed successfully', {status: 200});
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Webhook processing failed', {status: 500});
  }
}
