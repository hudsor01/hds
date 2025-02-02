import { auth, clerkClient } from '@clerk/nextjs/server'

export const getCurrentUser = async () => {
  const authResult = await auth(); // Await the auth promise
  const userId = authResult.userId; // Access userId from resolved object

  if (!userId) return null;

  const client = await clerkClient();
  return client.users.getUser(userId);
}
