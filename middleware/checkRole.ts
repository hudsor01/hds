import { useAuth } from '@clerk/nextjs';
import { roleSchema } from '@/lib/db/schema/roles';
import { prisma } from '../lib/prisma';

export async function checkRole(requiredRole: string[], organizationId: string) {
  const { userId } = useAuth();
  console.log('Current Clerk userId:', userId);

  if (!userId) {
    throw new Error('Unauthorized');
  }

  // First try to find the organization
  const organization = await prisma.organizations.findFirst({
    where: {
      user_id: organizationId,
    },
  });

  console.log('Found organization:', organization);

  if (!organization) {
    throw new Error('Organization not found');
  }

  // Then check if user is a member
  const member = await prisma.organization_members.findFirst({
    where: {
      organization_id: organizationId,
      user_id: userId,
    },
  });

  console.log('Found member:', member);

  if (!member) {
    throw new Error('User is not a member of this organization');
  }

  if (!requiredRole.includes(roleSchema.parse(member.role).name)) {
    throw new Error('Insufficient permissions');
  }

  return organization;
}
