'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { supabase } from '@/lib/supabase/client'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: LoginValues) {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })

      if (error) {
        throw error
      }

      router.refresh()
      router.push('/dashboard')
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error('Invalid email or password')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            disabled={isLoading}
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="your@email.com"
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            disabled={isLoading}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Enter your password"
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={isLoading} fullWidth>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  )
}
