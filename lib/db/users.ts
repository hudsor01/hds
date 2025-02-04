import {prisma} from '@/lib/prisma';
import {UserRole} from '@/types/roles';

export async function getUserByClerkId(clerkId: string) {
  const user = await prisma.users.findUnique({
    where: {
      clerkId: clerkId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      created_at: true,
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

export async function createUser(data: {clerkId: string; email: string; role?: UserRole}) {
  return prisma.users.create({
    data: {
      clerkId: data.clerkId,
      email: data.email,
      role: data.role || 'USER',
    },
  });
}
