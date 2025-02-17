'use client'

import { Button } from '@/components/button'
import Link from 'next/link'

interface SignInButtonProps {
  className?: string
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button variant="ghost" asChild className={className}>
      <Link href="/auth/signin">Sign In</Link>
    </Button>
  )
}
