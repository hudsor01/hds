import type { User } from '@clerk/nextjs/server'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'

export type UserRole = 'ADMIN' | 'OWNER' | 'MANAGER' | 'USER'

export async function getClerkUser(): Promise<User | null> {
  try {
    return await currentUser()
  } catch (error) {
    console.error('Error fetching Clerk user:', error)
    return null
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth()
  return session.userId
}

export async function updateUserMetadata(userId: string, metadata: Record<string, any>) {
  try {
    const user = await clerkClient.users.updateUser(userId, {
      privateMetadata: metadata
    })
    return user
  } catch (error) {
    console.error('Error updating user metadata:', error)
    throw error
  }
}

export async function getUserRole(): Promise<UserRole> {
  const user = await currentUser()
  if (!user) return 'USER'

  const metadata = user.privateMetadata as { role?: UserRole }
  return metadata.role || 'USER'
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    await clerkClient.users.updateUser(userId, {
      privateMetadata: { role }
    })
  } catch (error) {
    console.error('Error updating user role:', error)
    throw error
  }
}

export async function syncUserWithDatabase(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId)
    if (!user) return null

    // Add any database sync logic here
    return user
  } catch (error) {
    console.error('Error syncing user with database:', error)
    throw error
  }
}
