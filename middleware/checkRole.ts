import { useAuth } from '@clerk/nextjs';
import { prisma } from '../lib/prisma';

export async function checkRole(requiredRole: string[], organizationId: string) {
  const { userId } = useAuth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const organization = await prisma.organizations.findFirst({
    where: {
      id: organizationId,
      user_id: userId, // This should match your Clerk userId
    },
  });

  if (organization) {
    // Organization owner has all permissions
    return organization;
  }

  throw new Error('Organization not found or insufficient permissions');
}
