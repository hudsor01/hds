'use client'

import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorMessage =
    searchParams.get('message') || 'There was a problem authenticating your account.'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Authentication Error</h1>
        <p className="text-muted-foreground">{errorMessage}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/sign-in" passHref>
            <Button variant="default">Try Again</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
