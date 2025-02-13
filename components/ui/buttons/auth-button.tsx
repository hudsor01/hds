'use client'

import { signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/buttons/button'
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
      <Button disabled variant="outlined" className="w-full">
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <Button variant="outlined" onClick={handleSignOut} className="w-full">
        Sign Out
      </Button>
    )
  }

  return (
    <Button onClick={handleSignIn} className="w-full">
      Sign In with Google
    </Button>
  )
}
