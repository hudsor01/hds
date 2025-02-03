import {UserRole} from '@/types/roles';
import {auth} from '@clerk/nextjs';
import {clerkClient} from '@clerk/nextjs/server';

export async function getUser() {
  const {userId} = auth();
  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);
  return user;
}

export async function getUserRole(): Promise<UserRole | null> {
  const {userId} = auth();
  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);
  const metadata = user.privateMetadata as {role?: UserRole};
  return metadata.role || 'USER';
}

export async function setUserRole(userId: string, role: UserRole) {
  await clerkClient.users.updateUser(userId, {
    privateMetadata: {role},
  });
}
