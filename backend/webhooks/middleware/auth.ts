import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

export const requireAuth = ClerkExpressRequireAuth({
  // Optional: Configure clerk options
  clockSkewInSeconds: 30,
})
