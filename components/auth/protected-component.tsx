'use client'

import { useAuth } from '@/hooks/use-auth'

export function ProtectedComponent() {
  const { user, loading } = usesupabase.auth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please sign in to view this content</div>
  }

  return (
    <div>
      <h2>Protected Content</h2>
      <p>User ID: {user.id}</p>
    </div>
  )
}
