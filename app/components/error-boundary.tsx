'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ErrorBoundary({
  error,
  resetAction,
}: {
  error: Error & { digest?: string }
  resetAction: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="mx-auto max-w-md p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <ExclamationTriangleIcon className="h-8 w-8 text-destructive" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground">
            {error.message || 'There was a problem loading this section'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={resetAction}
          size="sm"
          className="gap-2"
        >
          Try again
        </Button>
      </div>
    </Card>
  )
}
