import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

interface User {
  id: string;
  role: UserRole;
  email: string;
  name: string | null;
}

// Role-based access control
export async function checkRole(
  req: NextRequest,
  allowedRoles: UserRole[],
): Promise<NextResponse | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!allowedRoles.includes(user.role)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return null;
  } catch (error) {
    console.error('Auth error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Permission checking
export async function checkPermission(
  req: NextRequest,
  permission: string,
): Promise<NextResponse | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userPermissions = user.permissions || [];
    if (!userPermissions.includes(permission)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    return null;
  } catch (error) {
    console.error('Permission error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Auth utilities
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.users.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
    },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    role: dbUser.role as UserRole,
    email: dbUser.email,
    name: dbUser.name,
  };
}

export async function getCurrentUserRole(userId: string): Promise<UserRole> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return (user?.role as UserRole) || 'USER';
}

export async function updateUserRole(userId: string, role: UserRole) {
  await prisma.users.update({
    where: { id: userId },
    data: { role },
  });
}

// Middleware helper
export async function withAuth() {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return { userId: user.id, user };
}
