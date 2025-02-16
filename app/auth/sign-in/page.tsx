'use client'

import { signIn } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'

export default function SignInPage({
  searchParams,
}: {
  searchParams: { error: string; message: string }
}) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email and password to access your dashboard
          </CardDescription>
        </CardHeader>
        <form 
          action={async (formData) => {
            setIsLoading(true)
            await signIn(formData)
            setIsLoading(false)
          }}
        >
          <CardContent className="space-y-4">
            {searchParams?.error && (
              <div className="rounded-md bg-destructive/15 p-3">
                <div className="text-sm text-destructive">
                  {searchParams.error}
                </div>
              </div>
            )}
            {searchParams?.message && (
              <div className="rounded-md bg-primary/15 p-3">
                <div className="text-sm text-primary">
                  {searchParams.message}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-sm text-center">
              <Link
                href="/auth/reset-password"
                className="text-primary hover:text-primary/80"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm text-center">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/sign-up"
                className="text-primary hover:text-primary/80"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}