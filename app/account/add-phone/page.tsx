'use client'

import * as React from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { supabase } from '../../../lib/supabase'
import { Button, TextField, Typography, Paper, Box, Alert, CircularProgress } from '@mui/material'
import { Phone as PhoneIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'

export default function PhoneVerificationPage() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const getUser = async () => {
      const {
        data: { user }
      } = await client.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])
  const [phone, setPhone] = React.useState('')
  const [code, setCode] = React.useState('')
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
    setError(null)
    setIsSubmitting(true)

    try {
      if (!phone.match(/^\+[1-9]\d{1,14}$/)) {
        throw new Error('Please enter a valid phone number in E.164 format (e.g., +12345678900)')
      }

      const { error: phoneError } = await supabase.auth.update({ phone })

      if (phoneError) throw phoneError

      setIsVerifying(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add phone number')
      console.error('Phone addition error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const { error: verifyError } = await supabase.auth.verify({ phone, token: code, type: 'sms' })

      if (verifyError) throw verifyError

      setSuccessful(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
      console.error('Verification error:', err)
    } finally {
      setIsSubmitting(false)
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
                Enter the verification code sent to {phone}
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" className="mt-4">
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Verification Code"
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={isSubmitting}
              placeholder="Enter 6-digit code"
              inputProps={{ maxLength: 6, pattern: '[0-9]*' }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting || code.length !== 6}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <PhoneIcon />}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
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

          {error && (
            <Alert severity="error" className="mt-4">
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            disabled={isSubmitting}
            placeholder="+12345678900"
            helperText="Enter phone number in E.164 format (e.g., +12345678900)"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitting || !phone}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <PhoneIcon />}
          >
            {isSubmitting ? 'Adding...' : 'Add Phone Number'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
