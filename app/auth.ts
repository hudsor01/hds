import {UserRole} from '@/types/roles';
import {useAuth} from '@clerk/nextjs';
import {auth, clerkClient} from '@clerk/nextjs/server';

export async function getUser() {
  const {userId} = useAuth();
  if (!userId) {
    return null;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user;
}

export async function getUserRole(): Promise<UserRole | null> {
  const {userId} = await auth();
  if (!userId) {
    return null;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const metadata = user.privateMetadata as {role?: UserRole};
  return metadata.role || 'USER';
}

export async function setUserRole(userId: string, role: UserRole) {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    privateMetadata: {role},
  });
}
