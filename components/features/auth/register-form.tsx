'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material'
import { toast } from 'sonner'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: RegisterValues) {
    try {
      setIsLoading(true)

      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile in profiles table
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: authData.user.id,
            full_name: values.name,
            email: values.email
          }
        ])

        if (profileError) throw profileError

        toast.success('Registration successful! Please check your email to verify your account.')
        router.push('/auth/verify-email')
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              placeholder="John Doe"
              fullWidth
              disabled={isLoading}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              placeholder="your@email.com"
              type="email"
              fullWidth
              disabled={isLoading}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              placeholder="Create a password"
              type="password"
              fullWidth
              disabled={isLoading}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              fullWidth
              disabled={isLoading}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 2 }}>
          {isLoading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </Box>
    </Box>
  )
}
