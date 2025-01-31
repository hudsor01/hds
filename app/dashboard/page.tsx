import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const clerkUser = await currentUser();
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      organizations: true
    }
  });

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Welcome, {clerkUser?.firstName}!
      </h1>
      {dbUser?.subscriptionStatus === 'active' && (
        <div className="text-green-600">Premium Member</div>
      )}
      {/* Dashboard content */}
    </div>
  );
}
