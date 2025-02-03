import {UserRole} from '@/types/roles';
import {auth, clerkClient, currentUser, type User} from '@clerk/nextjs/server';

export async function getClerkUser(): Promise<User | null> {
  try {
    return await currentUser();
  } catch (error) {
    console.error('Error fetching Clerk user:', error);
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const authData = await auth();
  return authData.userId;
}

export async function updateUserMetadata(userId: string, metadata: Record<string, any>) {
  try {
    const client = await clerkClient();
    const user = await client.users.updateUser(userId, {
      privateMetadata: metadata,
    });
    return user;
  } catch (error: unknown) {
    console.error('Clerk API error:', error);
    throw error;
  }
}

export async function getUserRole(): Promise<UserRole> {
  const user = await currentUser();
  if (!user) return 'USER';

  const metadata = user.privateMetadata as {role?: UserRole};
  return metadata.role || 'USER';
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      privateMetadata: {role},
    });
  } catch (error: unknown) {
    console.error('Clerk API error:', error);
    throw error;
  }
}

export async function syncUserWithDatabase(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    if (!user) return null;

    // Add any database sync logic here
    return user;
  } catch (error: unknown) {
    console.error('Clerk API error:', error);
    throw error;
  }
}
