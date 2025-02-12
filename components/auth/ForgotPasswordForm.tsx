'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Email as EmailIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Collapse, Link, Paper, TextField, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => Promise<void>
  redirectToLogin?: () => void
}

export const ForgotPasswordForm = ({ onSubmit, redirectToLogin }: ForgotPasswordFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const handleFormSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true)
      setError(null)

      if (onSubmit) {
        await onSubmit(data.email)
      }

      setSuccess(true)
      reset() // Clear form after successful submission
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      elevation={3}
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: 4
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Reset Your Password
      </Typography>

      <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
        Enter your email address and we'll send you instructions to reset your password.
      </Typography>

      <AnimatePresence>
        {error && (
          <Collapse in={!!error}>
            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
        )}

        {success && (
          <Collapse in={success}>
            <Alert severity="success" onClose={() => setSuccess(false)} sx={{ mb: 2 }}>
              Check your email for password reset instructions.
            </Alert>
          </Collapse>
        )}
      </AnimatePresence>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
              InputProps={{
                startAdornment: (
                  <EmailIcon
                    sx={{
                      mr: 1,
                      color: errors.email ? 'error.main' : 'action.active'
                    }}
                  />
                )
              }}
            />
          )}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<EmailIcon />}
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Instructions
        </LoadingButton>

        {redirectToLogin && (
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component="button"
              variant="body2"
              onClick={redirectToLogin}
              sx={{ cursor: 'pointer' }}
            >
              Back to Login
            </Link>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export type { ForgotPasswordFormProps }
