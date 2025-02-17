'use client'

import { Button } from '@/components/button'
import { useAuth } from '@/components/providers/auth-provider'

interface SignOutButtonProps {
  className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const { signOut } = useAuth()

  return (
    <Button variant="outline" onClick={signOut} className={className}>
      Sign Out
    </Button>
  )
}
