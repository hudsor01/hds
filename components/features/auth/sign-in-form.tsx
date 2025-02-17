'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Stack } from '@mui/material'
import * as z from 'zod'

import { signIn } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters')
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: SignInValues) {
    try {
      setIsLoading(true)
      const { success, message } = await signIn(values.email, values.password)

      if (!success) {
        throw new Error(message)
      }

      // Get the return URL from the search params or default to dashboard
      const returnTo = searchParams.get('returnTo') || '/dashboard'

      toast.success('Signed in successfully')
      router.refresh() // Refresh the current route to update server components
      router.push(returnTo)
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="name@example.com" {...field} disabled={isLoading} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your password" {...field} disabled={isLoading} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Stack>
      </form>
    </Form>
  )
}
