'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller, type Control, type FieldValues } from 'react-hook-form'
import { Stack, TextField, Button, CircularProgress, Box, type Theme, type SxProps } from '@mui/material'
import * as z from 'zod'
import { signIn } from '@/lib/supabase/auth'
import { toast } from 'sonner'

// Schema and type definitions
const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters')
})

type SignInValues = z.infer<typeof signInSchema>

interface FormControlProps {
  control: Control<SignInValues>
  isLoading: boolean
  errors: Record<string, { message?: string }>
}

interface FormFieldStyles {
  button: SxProps<Theme>
  loadingContainer: SxProps<Theme>
  loadingIndicator: SxProps<Theme>
}

// Styled components configuration
const styles: FormFieldStyles = {
  button: {
    mt: 2,
    height: 42
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingIndicator: {
    mr: 1,
    color: 'inherit'
  }
}

// Form field components
const EmailField = ({ control, isLoading, errors }: FormControlProps) => (
  <Controller
    name="email"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="email"
        label="Email"
        placeholder="name@example.com"
        disabled={isLoading}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        size="small"
        autoComplete="email"
        inputProps={{
          'aria-label': 'Email address'
        }}
      />
    )}
  />
)

const PasswordField = ({ control, isLoading, errors }: FormControlProps) => (
  <Controller
    name="password"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="password"
        label="Password"
        placeholder="Enter your password"
        disabled={isLoading}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        size="small"
        autoComplete="current-password"
        inputProps={{
          'aria-label': 'Password'
        }}
      />
    )}
  />
)

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSignIn = async (values: SignInValues): Promise<void> => {
    try {
      setIsLoading(true)
      const { success, message } = await signIn(values.email, values.password)

      if (!success) {
        throw new Error(message)
      }

      const returnTo = searchParams.get('returnTo') || '/dashboard'

      toast.success('Signed in successfully')
      router.refresh()
      router.push(returnTo)
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const formFieldProps: FormControlProps = {
    control,
    isLoading,
    errors
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate>
      <Stack spacing={2}>
        <EmailField {...formFieldProps} />
        <PasswordField {...formFieldProps} />

        <Button type="submit" variant="contained" disabled={isLoading} fullWidth sx={styles.button}>
          {isLoading ? (
            <Box sx={styles.loadingContainer}>
              <CircularProgress size={20} sx={styles.loadingIndicator} />
              Signing in...
            </Box>
          ) : (
            'Sign in'
          )}
        </Button>
      </Stack>
    </Box>
  )
}

// Export types for potential consumers
export type { SignInValues, FormControlProps }
