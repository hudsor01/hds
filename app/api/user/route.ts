import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const clerkUser = await currentUser();

  // Get additional user data from Prisma
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      subscriptionStatus: true,
      role: true,
      organizations: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });

  return NextResponse.json({
    id: clerkUser?.id,
    firstName: clerkUser?.firstName,
    lastName: clerkUser?.lastName,
    email: clerkUser?.emailAddresses[0]?.emailAddress,
    ...dbUser
  });
}
