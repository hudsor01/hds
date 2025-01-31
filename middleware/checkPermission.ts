import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/types/roles';

export async function checkPermission(
  permission: keyof typeof PERMISSIONS,
  organizationId: string,
) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  // You can use sessionClaims to check roles/permissions
  const userRole = sessionClaims?.role;

  const member = await prisma.organizations.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      user_id: true,
    },
  });

  if (!member) {
    throw new Error('Organization not found');
  }

  // Add role-based permission check
  if (userRole !== 'admin' && member.user_id !== userId) {
    throw new Error('Insufficient permissions');
  }

  return true;
}
