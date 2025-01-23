import { authOptions } from '@/auth';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { trialDays } = await req.json();

    // First get the user's ID since we need it for the update
    const existingUser = await prisma.users.findFirst({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user with trial information
    const user = await prisma.users.update({
      where: {
        id: existingUser.id,
      },
      data: {
        subscription_status: 'trialing',
        trial_ends_at: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000),
      },
      select: {
        id: true,
        email: true,
        subscription_status: true,
        trial_ends_at: true,
      },
    });

    if (!user || !user.subscription_status || !user.trial_ends_at) {
      return NextResponse.json({ error: 'Failed to activate free trial' }, { status: 500 });
    }

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
    console.error('Free trial activation error:', error);
    return NextResponse.json({ error: 'Failed to activate free trial' }, { status: 500 });
  }
}
