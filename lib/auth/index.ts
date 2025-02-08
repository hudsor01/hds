import {UserRole} from '@/types/roles';
import {NextRequest, NextResponse} from 'next/server';
import { prisma } from '@/lib/prisma/prisma';
import { db } from '@/lib/db';

interface ExtendedUserResource extends UserResource {
  privateMetadata?: {role?: UserRole; permissions?: string[]};
}

// Role-based access control
export async function checkRole(
  req: NextRequest,
  allowedRoles: UserRole[],
): Promise<NextResponse | null> {
  try {
    const {userId} = await getAuth();
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const metadata = user.privateMetadata as {role?: UserRole};
    const userRole = metadata.role || 'USER';

    if (!allowedRoles.includes(userRole)) {
      return new NextResponse('Forbidden', {status: 403});
    }

    return null;
  } catch (error) {
    console.error('Auth error:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

// Permission checking
export async function checkPermission(
  req: NextRequest,
  permission: string,
): Promise<NextResponse | null> {
  try {
    const {userId} = await getAuth();
    if (!userId) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const metadata = user.privateMetadata as {permissions?: string[]};
    const userPermissions = metadata.permissions || [];

    if (!userPermissions.includes(permission)) {
      return new NextResponse('Forbidden', {status: 403});
    }

    return null;
  } catch (error) {
    console.error('Permission error:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}

// Auth utilities
export async function getCurrentUser() {
  return await getCurrentUser();
}

export async function getCurrentUserRole(userId: string): Promise<UserRole> {
  const user = await prisma.users.getCurrentUser(userId); // Use prisma
  return (user.privateMetadata?.role as UserRole) || 'USER';
}

export async function updateUserRole(userId: string, role: UserRole) {
  await db.users.updateUser(userId, {
    privateMetadata: {role},
  });
}

export async function requireAuth() {
  const {userId} = await getAuth();
  if (!userId) throw new Error('Unauthorized');
  return userId;
}

// Auth hooks
export function useAuth() {
  const {isLoaded, isSignedIn, user} = useUser();
  const extendedUser = user as ExtendedUserResource | null;
  const metadata = extendedUser?.privateMetadata || {};

  return {
    isLoaded,
    isAuthenticated: isSignedIn,
    userId: user?.id,
    role: metadata.role || 'USER',
    permissions: metadata.permissions || [],
    checkPermission: (permission: string) => metadata.permissions?.includes(permission) || false,
  };
}
function getAuth (): { userId: any } | PromiseLike<{ userId: any }>
{
  throw new Error('Function not implemented.')
}

function useUser (): { isLoaded: any; isSignedIn: any; user: any }
{
  throw new Error('Function not implemented.')
}
