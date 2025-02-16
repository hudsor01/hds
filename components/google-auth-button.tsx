'use client'

import { signIn } from '@/auth'
import MuiButton from '@mui/material/Button'

export default function SignIn() {
  return (
    <form
      action={async () => {
        await signIn('google')
      }}
    >
      <MuiButton type="submit">Sign in with Google</MuiButton>
    </form>
  )
}
