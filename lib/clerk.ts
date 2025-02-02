import { auth, clerkClient } from '@clerk/nextjs'

export const getCurrentUser = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return await clerkClient.users.getUser(userId)
}
