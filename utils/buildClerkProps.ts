import { auth } from '@clerk/nextjs/server'

export async function getServerSideAuth() {
  const { userId } = await auth()
  return {
    userId,
    isAuthenticated: !!userId,
  }
}
