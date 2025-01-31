import { useAuth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { ROLE_PERMISSIONS } from '@/types/roles';

export async function createOrganization(name: string) {
  const { userId } = useAuth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const organization = await prisma.organizations.create({
    data: {
      name,
      members: {
        create: {
          userId,
          role: 'OWNER',
          permissions: {
            create: ROLE_PERMISSIONS.OWNER.map(permission => ({
              name: permission,
            })),
          },
        },
      },
    },
  });

  return organization;
}

export async function addMemberToOrganization(
  organizationId: string,
  userId: string,
  role: 'PROPERTY_MANAGER' | 'MAINTENANCE' | 'TENANT',
) {
  const member = await prisma.organizationMember.create({
    data: {
      userId,
      organizationId,
      role,
      permissions: {
        create: ROLE_PERMISSIONS[role].map(permission => ({
          name: permission,
        })),
      },
    },
  });

  return member;
}
