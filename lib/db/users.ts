import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function getUserByClerkId(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      properties: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return user;
}

export async function createUser(data: {
  clerkId: string;
  email: string;
  role?: Role;
}) {
  return prisma.user.create({
    data: {
      clerkId: data.clerkId,
      email: data.email,
      role: data.role || 'USER',
    },
  });
}
