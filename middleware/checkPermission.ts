import { useAuth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/types/roles';

export async function checkPermission(
  permission: keyof typeof PERMISSIONS,
  organizationId: string,
) {
  const { userId } = useAuth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const member = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
    include: {
      permissions: true,
    },
  });

  if (
    !member ||
    !member.permissions.some((p: { name: string }) => p.name === PERMISSIONS[permission])
  ) {
    throw new Error('Insufficient permissions');
  }

  return true;
}
