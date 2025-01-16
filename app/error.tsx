'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'react-feather'

import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex max-w-md flex-col items-center gap-6 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h1 className="text-2xl font-bold tracking-tight">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. We've been notified and are working to fix the issue.
            </p>
            <Button
              onClick={reset}
              size="lg"
              className="gap-2"
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
