import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/types/roles';

export async function checkPermission(
  permission: keyof typeof PERMISSIONS,
  organizationId: string,
) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const member = await prisma.organizations.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      user_id: true,
    }
  });

  if (!member) {
    throw new Error('Organization not found');
  }

  // For now, if the user is a member of the organization, grant permission
  // You can expand this later with more granular permission checks
  if (member.user_id !== userId) {
    throw new Error('Insufficient permissions');
  }

  return true;
}
