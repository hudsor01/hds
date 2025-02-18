'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  InputAdornment,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material'
import { Email as EmailIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { resetPassword } from '@/lib/supabase/auth'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address')
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const theme = useTheme()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      setIsLoading(true)
      const { error } = await resetPassword(values.email)

      if (error) {
        throw error
      }

      setSnackbar({
        open: true,
        message: 'Password reset instructions have been sent to your email',
        severity: 'success'
      })

      // Optional: Redirect to a confirmation page
      router.push('/auth/check-email')
    } catch (error) {
      console.error('Password reset error:', error)
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to send reset instructions',
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
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email and we'll send you instructions to reset your password
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                fullWidth
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
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
                <span>Sending Instructions...</span>
              </Box>
            ) : (
              'Send Reset Instructions'
            )}
          </Button>
        </Box>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            router.push('/sign-in')
          }}
          sx={{
            textTransform: 'none',
            alignSelf: 'center'
          }}
        >
          Back to Sign In
        </Button>
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
