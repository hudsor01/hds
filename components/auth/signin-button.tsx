'use client'

import { useSignIn } from '@clerk/nextjs'
import { Button } from '@mui/material'

export function SignInButton() {
  const { signIn } = useSignIn()

  return (
    <Button
      variant="contained"
      onClick={() => signIn.create({
        redirectUrl: '/dashboard'
      })}
    >
      Sign In
    </Button>
  )
}
