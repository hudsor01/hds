import getServerSession from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Find the user by email
    const existingUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        subscriptionStatus: true,
      },
    });

    if (!existingUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Update user with trial status
    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        subscriptionStatus: 'trialing',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      },
      select: {
        id: true,
        subscriptionStatus: true,
        trialEndsAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to activate free trial:', error);
    return new NextResponse('Failed to activate free trial', { status: 500 });
  }
}
