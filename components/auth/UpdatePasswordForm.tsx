'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock as LockIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, Box, Collapse, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>

interface UpdatePasswordFormProps {
  onSubmitAction: (data: UpdatePasswordFormValues) => Promise<void>
}

export const UpdatePasswordForm = ({ onSubmitAction }: UpdatePasswordFormProps) => {
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const handleFormSubmit = async (data: UpdatePasswordFormValues) => {
    try {
      setError(null)
      await onSubmitAction(data)
      setSuccess(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Update Password
      </Typography>

      <Collapse in={!!error || success}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password updated successfully
          </Alert>
        )}
      </Collapse>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Current Password"
              type="password"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label="Confirm New Password"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<LockIcon />}
          sx={{ mt: 3 }}
        >
          Update Password
        </LoadingButton>
      </Box>
    </Paper>
  )
}
