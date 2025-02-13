'use client'

import { Button } from '@/components/ui/buttons/button'
import { useState } from 'react'
import { Github } from 'react-feather'

export function OauthSignIn() {
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    try {
      // Simulate sign-in process
      throw new Error('Sign-in failed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  return (
    <div className="grid gap-2">
      {error && <div className="text-red-500">{error}</div>}
      <Button variant="outline" type="button" onClick={handleSignIn}>
        <Github className="mr-2 h-4 w-4" />
        Continue with Github
      </Button>
    </div>
  )
}
