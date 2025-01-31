'use server';

import { useAuth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { ROLE_PERMISSIONS } from '@/types/roles';

export async function createOrganization(name: string) {
  const { userId } = useAuth(); // Use server-side auth

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const organization = await prisma.organizations.create({
    // Ensure model name matches schema
    data: {
      name,
      organizationMembers: {
        // Ensure this matches your schema
        create: {
          userId, // Ensure this matches your schema
          role: OrganizationRole.OWNER, // Use the correct enum
          permissions: {
            create: ROLE_PERMISSIONS.OWNER.map(permission => ({
              name: permission,
              userId, // Ensure this matches your schema
            })),
          },
        },
      },
    },
    include: {
      organizationMembers: {
        // Ensure this matches your schema
        include: {
          permissions: true,
        },
      },
    },
  });

  return organization;
}

export async function addMemberToOrganization(
  organizationId: string,
  userId: string,
  role: OrganizationRole, // Use the correct enum
) {
  const member = await prisma.organization_members.create({
    // Ensure model name matches schema
    data: {
      userId, // Ensure this matches your schema
      organizationId, // Ensure this matches your schema
      role,
      permissions: {
        create: ROLE_PERMISSIONS[role].map(permission => ({
          name: permission,
          userId, // Ensure this matches your schema
          organizationId, // Ensure this matches your schema
        })),
      },
    },
    include: {
      permissions: true,
    },
  });

  return member;
}
