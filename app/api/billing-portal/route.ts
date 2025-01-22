import { authOptions } from "@/auth";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No subscription found" },
      { status: 400 },
    );
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: session.user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({ url: portalSession.url });
}
