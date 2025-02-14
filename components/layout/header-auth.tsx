'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'

export default function HeaderAuth() {
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) return null

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground text-sm">{user.email}</span>
      <Button onClick={handleSignOut} variant="outline">
        Sign out
      </Button>
    </div>
  )
}
