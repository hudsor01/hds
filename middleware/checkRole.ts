import { useAuth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function checkRole(requiredRole: string[], organizationId: string) {
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

  if (!member || !requiredRole.includes(member.role)) {
    throw new Error('Insufficient permissions');
  }

  return member;
}
