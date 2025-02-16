'use client'

import { useTransition } from 'react'
import { signOut } from '../../app/auth/lib/auth/auth'
import MuiButton from '@mui/material/Button'

interface SignOutButtonProps {
  className?: string
  children?: React.ReactNode
}

export function SignOutButton({ className, children }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut()
      } catch (error) {
        console.error('Sign out error:', error)
      }
    })
  }

  return (
    <MuiButton onClick={handleSignOut} className={className || ''} disabled={isPending}>
      {children || (isPending ? 'Signing out...' : 'Sign out')}
    </MuiButton>
  )
}
