'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const formData = new FormData(e.target as HTMLFormElement)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error:', error)
      window.location.href = '/login?error=auth'
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
      window.location.href = '/login?error=auth'
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                Authentication failed. Please try again.
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              {isGoogleLoading ? 'Loading...' : 'Google'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span>Don't have an account? </span>
            <Link href={{ pathname: '/signup' }} className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
          <Link href={{ pathname: '/forgot-password' }} className="text-sm text-primary underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
