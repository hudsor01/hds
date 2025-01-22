import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { trialDays } = await req.json();

    // First get the user's ID since we need it for the update
    const existingUser = await prisma.users.findFirst({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user with trial information
    const user = await prisma.users.update({
      where: { id: existingUser.id },
      data: {
        stripe_customer_id: null,
        stripe_subscription_id: null,
        subscription_status: "trialing",
        trial_ends_at: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        subscription_status: user.subscription_status,
        trial_ends_at: user.trial_ends_at,
      },
    });
  } catch (error) {
    console.error("Free trial activation error:", error);
    return NextResponse.json(
      { error: "Failed to activate free trial" },
      { status: 500 },
    );
  }
}
