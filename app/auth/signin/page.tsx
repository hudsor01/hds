import { signIn } from '@/app/auth/actions'

import { redirect } from 'next/navigation'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/core/Card/card'
import Link from 'next/link'

export default async function SignInPage({ searchParams }: { searchParams: { error: string; message: string } }) {
  const supabase = createClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password to access your dashboard</CardDescription>
        </CardHeader>
        <form action={signIn}>
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
            <div className="space-y-2">
              <label htmlFor="password" className="text-foreground block text-sm font-medium">
                Password
              </label>
              <Input id="password" name="password" type="password" required placeholder="Enter your password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-center text-sm">
              <Link href="/auth/reset-password" className="text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:text-primary/80">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
