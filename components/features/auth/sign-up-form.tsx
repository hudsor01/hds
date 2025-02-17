'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller, type Control } from 'react-hook-form'
import { Box, Stack, TextField, Button, CircularProgress, Typography, type Theme, type SxProps } from '@mui/material'
import * as z from 'zod'
import { signUp } from '@/lib/supabase/auth'
import { toast } from 'sonner'

// Schema definition with strong types
const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one letter and one number'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type SignUpValues = z.infer<typeof signUpSchema>

interface FormControlProps {
  control: Control<SignUpValues>
  isLoading: boolean
  errors: Record<string, { message?: string }>
}

interface FormFieldStyles {
  form: SxProps<Theme>
  field: SxProps<Theme>
  button: SxProps<Theme>
  loadingContainer: SxProps<Theme>
}

// Styled components configuration
const styles: FormFieldStyles = {
  form: {
    width: '100%',
    maxWidth: 400,
    mx: 'auto'
  },
  field: {
    mb: 2
  },
  button: {
    mt: 2,
    height: 42
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
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
        sx={styles.field}
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
        placeholder="Create a password"
        disabled={isLoading}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        size="small"
        autoComplete="new-password"
        sx={styles.field}
        inputProps={{
          'aria-label': 'Password'
        }}
      />
    )}
  />
)

const ConfirmPasswordField = ({ control, isLoading, errors }: FormControlProps) => (
  <Controller
    name="confirmPassword"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        disabled={isLoading}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        size="small"
        autoComplete="new-password"
        sx={styles.field}
        inputProps={{
          'aria-label': 'Confirm password'
        }}
      />
    )}
  />
)

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSignUp = async (values: SignUpValues): Promise<void> => {
    try {
      setIsLoading(true)
      const { success, message } = await signUp(values.email, values.password)

      if (!success) {
        throw new Error(message)
      }

      toast.success(message)
      router.push('/sign-in?message=Please check your email to confirm your account')
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to sign up')
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
    <Box component="form" onSubmit={handleSubmit(handleSignUp)} sx={styles.form} noValidate>
      <Stack spacing={2}>
        <EmailField {...formFieldProps} />
        <PasswordField {...formFieldProps} />
        <ConfirmPasswordField {...formFieldProps} />

        {/* Password requirements */}
        <Typography variant="caption" color="text.secondary">
          Password must be at least 8 characters and contain at least one letter and one number
        </Typography>

        <Button type="submit" variant="contained" disabled={isLoading} fullWidth sx={styles.button}>
          {isLoading ? (
            <Box sx={styles.loadingContainer}>
              <CircularProgress size={20} />
              <span>Creating account...</span>
            </Box>
          ) : (
            'Create account'
          )}
        </Button>
      </Stack>
    </Box>
  )
}

// Export types for potential consumers
export type { SignUpValues, FormControlProps }
