'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth/auth-provider'

interface SignOutButtonProps {
  className?: string
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const { signOut } = useAuth()

  return (
    <Button 
      variant="outline" 
      onClick={signOut}
      className={className}
    >
      Sign Out
    </Button>
  )
}