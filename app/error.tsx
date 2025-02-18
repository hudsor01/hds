'use client'

import { ErrorOutline } from '@mui/icons-material'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive" className="flex items-center gap-2">
          <ErrorOutline className="h-5 w-5" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{error.message || 'An unexpected error occurred'}</AlertDescription>
        </Alert>
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outlined" onClick={() => (window.location.href = '/')}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
