import {UserRole} from '@/types/roles';
import {useUser} from '@clerk/nextjs';
import {clerkClient, currentUser, auth as getAuth} from '@clerk/nextjs/server';
import type {UserResource} from '@clerk/types';
import {NextRequest, NextResponse} from 'next/server';

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

    const user = await currentUser();
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

    const user = await currentUser();
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
  return await currentUser();
}

export async function getUserRole(): Promise<UserRole> {
  const user = await getCurrentUser();
  if (!user) return 'USER';
  const metadata = user.privateMetadata as {role?: UserRole};
  return metadata.role || 'USER';
}

export async function setUserRole(userId: string, role: UserRole) {
  const user = await currentUser();
  if (!user) throw new Error('No user found');

  // Merge the new role with the existing metadata
  const newMetadata = {
    ...user.privateMetadata,
    role,
  };

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    privateMetadata: newMetadata,
  });
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
