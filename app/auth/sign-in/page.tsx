'use client'

import { signIn } from '@/app/auth/actions'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

interface SignInPageProps {
  searchParams: {
    error: string
    message: string
  }
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password to access your dashboard</CardDescription>
        </CardHeader>
        <form
          action={async formData => {
            setIsLoading(true)
            await signIn(formData)
            setIsLoading(false)
          }}
        >
          <CardContent className="space-y-4">
            {searchParams.error && (
              <div className="bg-destructive/15 rounded-md p-3">
                <div className="text-destructive text-sm">{searchParams.error}</div>
              </div>
            )}
            {searchParams.message && (
              <div className="bg-primary/15 rounded-md p-3">
                <div className="text-primary text-sm">{searchParams.message}</div>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-foreground block text-sm font-medium">
                Email
              </label>
              <TextField id="email" name="email" type="email" required placeholder="Enter your email" fullWidth />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-foreground block text-sm font-medium">
                Password
              </label>
              <TextField id="password" name="password" type="password" required placeholder="Enter your password" fullWidth />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-center text-sm">
              <Link href="/auth/reset-password" className="text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/sign-up" className="text-primary hover:text-primary/80">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
