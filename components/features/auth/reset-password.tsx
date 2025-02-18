'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material'
import { Lock as LockIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'
import { updatePassword } from '@/lib/supabase/auth'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export function ResetPassword() {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'info'
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      setIsLoading(true)
      const token = searchParams.get('token')

      if (!token) {
        throw new Error('Reset token is missing')
      }

      const { error } = await updatePassword(values.password, token)

      if (error) {
        throw error
      }

      setSnackbar({
        open: true,
        message: 'Password has been successfully reset',
        severity: 'success'
      })

      // Redirect to sign in after a short delay
      setTimeout(() => {
        router.push('/sign-in')
      }, 2000)
    } catch (error) {
      console.error('Password reset error:', error)
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to reset password',
        severity: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom fontWeight="600">
            Reset Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your new password below
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
                fullWidth
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword)
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                disabled={isLoading}
                fullWidth
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword)
                        }}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Resetting Password...</span>
              </Box>
            ) : (
              'Reset Password'
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
