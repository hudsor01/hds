import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const authObj = await auth();
    const userId = authObj.userId;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const clerkUser = await currentUser();

    // Get additional user data from Prisma
    const dbUser = await prisma.users.findUnique({
      where: { clerkId: clerkUser?.id },
      select: {
        id: true,
        subscription_status: true,
        email: true
      }
    });

    return NextResponse.json({
      id: clerkUser?.id,
      firstName: clerkUser?.firstName,
      lastName: clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      ...dbUser
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
