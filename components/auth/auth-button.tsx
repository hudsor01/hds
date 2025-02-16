'use client'

import { signIn, signOut } from '@/auth'
import MuiButton from '@mui/material/Button'
import { useTransition, useSession } from 'react'

export function AuthButton() {
  const { data: session, status } = useSession()
  const [isPending, startTransition] = useTransition()
  const isLoading = status === 'loading' || isPending

  const handleSignIn = async () => {
    startTransition(async () => {
      try {
        await signIn('google', { callbackUrl: '/dashboard' })
      } catch (error) {
        console.error('Sign in failed:', error)
      }
    })
  }

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await signOut({ callbackUrl: '/' })
      } catch (error) {
        console.error('Sign out failed:', error)
      }
    })
  }

  if (isLoading) {
    return (
      <MuiButton disabled variant="outlined" className="w-full">
        Loading...
      </MuiButton>
    )
  }

  if (session) {
    return (
      <MuiButton variant="outlined" onClick={handleSignOut} className="w-full">
        Sign Out
      </MuiButton>
    )
  }

  return (
    <MuiButton onClick={handleSignIn} className="w-full">
      Sign In with Google
    </MuiButton>
  )
}
