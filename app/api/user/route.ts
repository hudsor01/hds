import {prisma} from '@/lib/prisma';
import {currentUser} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const dbUser = await prisma.users.findUnique({
      where: {clerkId: user.id},
      select: {
        id: true,
        subscription_status: true,
        email: true,
        stripe_customer_id: true,
      },
    });

    if (!dbUser) {
      // Create user in database if they don't exist
      const newUser = await prisma.users.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || '',
          name: `${user.firstName} ${user.lastName}`.trim(),
        },
      });
      return NextResponse.json({
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddresses[0]?.emailAddress,
        dbUser: newUser,
      });
    }

    return NextResponse.json({
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddresses[0]?.emailAddress,
      ...dbUser,
    });
  } catch (error) {
    console.error('Error in user route:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
