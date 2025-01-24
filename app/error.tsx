'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useEffect } from 'react'

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
            <Icon name="alert-triangle" className="h-12 w-12 text-destructive" />
            <h1 className="text-2xl font-bold tracking-tight">
              Something went wrong!
            </h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. We've been notified and are working to fix the issue.
            </p>
            <Button
              onClick={reset}
              className="gap-2 py-2 px-4"
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
