'use server';

import { prisma } from '../lib/prisma';
import { getSession } from '../lib/session';

export async function getUser() {
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      console.error('User not found for session userId:', session.userId);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

export async function updateUser(
  userId: string,
  data: {
    name?: string;
    email?: string;
    emailVerified?: Date | null;
  },
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}
