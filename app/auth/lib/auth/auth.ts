import {AuthService} from './service';
import {prisma} from '@/lib/prisma';
import type {Session} from '@prisma/client';

const authService = new AuthService();

export async function getSession(): Promise<Session | null> {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        expires: {gt: new Date()},
      },
      orderBy: {expires: 'desc'},
      take: 1,
    });
    return sessions[0] || null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function signOut() {
  try {
    const session = await getSession();
    if (session) {
      await authService.revokeSession(session.id);
    }
    window.location.href = '/login';
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {id: session.userId},
    });
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function updateUserProfile(updates: {
  email?: string;
  password?: string;
  data?: Record<string, any>;
}) {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');

  try {
    const user = await prisma.user.update({
      where: {id: session.userId},
      data: updates,
    });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}
