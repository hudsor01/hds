import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          <p className="mb-4">
            There was a problem with the authentication process. This could be due to an expired link or invalid credentials.
          </p>
          <div className="mt-4 flex space-x-4">
            <Button
              component={Link}
              href="/login"
              variant="contained"
              color="primary"
            >
              Return to Login
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}