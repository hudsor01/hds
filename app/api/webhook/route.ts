import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await prisma.users.update({
          where: { id: session.client_reference_id! },
          data: {
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: "active",
            trial_ends_at: null,
          },
        });
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        await prisma.users.update({
          where: { stripe_customer_id: invoice.customer as string },
          data: {
            subscription_status: "active",
          },
        });
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice;
        await prisma.users.update({
          where: { stripe_customer_id: failedInvoice.customer as string },
          data: {
            subscription_status: "past_due",
          },
        });
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
