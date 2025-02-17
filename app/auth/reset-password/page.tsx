'use client'

import { resetPassword } from '@/app/auth/actions'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/core/Card/card'
import Link from 'next/link'
import { useState } from 'react'

export default function ResetPasswordPage({ searchParams }: { searchParams: { error: string; message: string } }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your email address and we&apos;ll send you a password reset link</CardDescription>
        </CardHeader>
        <form
          action={async formData => {
            setIsLoading(true)
            await resetPassword(formData)
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
              <Input id="email" name="email" type="email" required placeholder="Enter your email" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending link...' : 'Send reset link'}
            </Button>
            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link href="/auth/sign-in" className="text-primary hover:text-primary/80">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
