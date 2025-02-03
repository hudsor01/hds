import {prisma} from '@/lib/prisma';
import {auth} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export async function POST() {
  const {userId} = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        subscriptionStatus: true,
      },
    });

    if (!existingUser) {
      return new NextResponse('User not found', {status: 404});
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        subscriptionStatus: 'trialing',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
    return new NextResponse('Failed to activate free trial', {status: 500});
  }
}
