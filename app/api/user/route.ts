import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserByClerkId } from '@/lib/db/users'

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await getUserByClerkId(userId);

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

  const clerkUser = await currentUser();

  // Get additional user data from Prisma
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      subscription_status: true,
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
