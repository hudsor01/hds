'use client'

import * as React from 'react'
import supabase from '@/lib/supabase'
import Button from '@mui/material/Button'
import TextField from '@mui/material'
import Typography from '@mui/material'
import Paper from '@mui/material'
import Box from '@mui/material'
import Alert from '@mui/material'
import CircularProgress from '@mui/material'
import { User } from '@supabase/supabase-js'
import { Button, TextField, Typography, Paper, Box, Alert, CircularProgress } from '@mui/material'
import { Phone as PhoneIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { Forms, UI } from '@/types'

type VerificationProps = {
  phone: string
  code: string
} & Forms.State

export default function PhoneVerificationPage() {
  const [formState, setFormState] = React.useState<VerificationProps>({
    phone: '',
    code: '',
    isSubmitting: false,
    error: null,
    success: false
  })

  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)

  if (loading) {
    return (
      <Box className="flex-center h-screen">
        <CircularProgress />
      </Box>
    )
  }

  if (!loading && !user?.id) {
    return (
      <Box className="p-4">
        <Alert severity="error">You must be logged in to access this page</Alert>
      </Box>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState(prevState => ({ ...prevState, error: null, isSubmitting: true }))

    try {
      if (!formState.phone.match(/^\+[1-9]\d{1,14}$/)) {
        throw new Error('Please enter a valid phone number in E.164 format (e.g., +12345678900)')
      }

      const { error: phoneError } = await supabase.auth.update({ phone: formState.phone })

      if (phoneError) throw phoneError

      setIsVerifying(true)
    } catch (err) {
      setFormState(prevState => ({
        ...prevState,
        error: err instanceof Error ? err.message : 'Failed to add phone number'
      }))
      console.error('Phone addition error:', err)
    } finally {
      setFormState(prevState => ({ ...prevState, isSubmitting: false }))
    }
  }

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState(prevState => ({ ...prevState, error: null, isSubmitting: true }))

    try {
      const { error: verifyError } = await supabase.auth.verify({
        phone: formState.phone,
        token: formState.code,
        type: 'sms'
      })

      if (verifyError) throw verifyError

      setSuccessful(true)
    } catch (err) {
      setFormState(prevState => ({
        ...prevState,
        error: err instanceof Error ? err.message : 'Verification failed'
      }))
      console.error('Verification error:', err)
    } finally {
      setFormState(prevState => ({ ...prevState, isSubmitting: false }))
    }
  }

  if (successful) {
    return (
      <Box className="container-content py-8">
        <Paper className="surface p-6">
          <Box className="flex-center flex-col gap-4">
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <Typography variant="h4" component="h1">
              Phone Number Verified Successfully
            </Typography>
            <Typography color="text.secondary">
              Your phone number has been added to your account
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  }

  if (isVerifying) {
    return (
      <Box className="container-content py-8">
        <Paper className="surface p-6">
          <form onSubmit={verifyCode} className="space-y-6">
            <Box className="flex-center flex-col gap-4">
              <PhoneIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h4" component="h1">
                Verify Your Phone Number
              </Typography>
              <Typography color="text.secondary">
                Enter the verification code sent to {formState.phone}
              </Typography>
            </Box>

            {formState.error && (
              <Alert severity="error" className="mt-4">
                {formState.error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Verification Code"
              value={formState.code}
              onChange={e => setFormState(prevState => ({ ...prevState, code: e.target.value }))}
              disabled={formState.isSubmitting}
              placeholder="Enter 6-digit code"
              inputProps={{ maxLength: 6, pattern: '[0-9]*' }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formState.isSubmitting || formState.code.length !== 6}
              startIcon={formState.isSubmitting ? <CircularProgress size={20} /> : <PhoneIcon />}
            >
              {formState.isSubmitting ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
        </Paper>
      </Box>
    )
  }

  return (
    <Box className="container-content py-8">
      <Paper className="surface p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Box className="flex-center flex-col gap-4">
            <PhoneIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h4" component="h1">
              Add Phone Number
            </Typography>
            <Typography color="text.secondary">
              Add a phone number to enhance your account security
            </Typography>
          </Box>

          {formState.error && (
            <Alert severity="error" className="mt-4">
              {formState.error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Phone Number"
            value={formState.phone}
            onChange={e => setFormState(prevState => ({ ...prevState, phone: e.target.value }))}
            disabled={formState.isSubmitting}
            placeholder="+12345678900"
            helperText="Enter phone number in E.164 format (e.g., +12345678900)"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={formState.isSubmitting || !formState.phone}
            startIcon={formState.isSubmitting ? <CircularProgress size={20} /> : <PhoneIcon />}
          >
            {formState.isSubmitting ? 'Adding...' : 'Add Phone Number'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
