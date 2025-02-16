'use client'

import * as React from 'react'
import supabase from '@/lib/supabase'
import { type User } from '@supabase/supabase-js'
import { Button, TextField, Typography, Paper, Box, Alert, CircularProgress } from '@mui/material'
import { Email as EmailIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { type Forms } from '@/types'

type EmailVerificationState = {
  email: string
  code: string
} & Forms.State

export default function EmailAdditionPage(): React.ReactElement {
  const [formState, setFormState] = React.useState<EmailVerificationState>({
    email: '',
    code: '',
    isSubmitting: false,
    error: null,
    success: false
  })

  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)

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

  if (loading) return null

  if (!user?.id) {
    return <p>You must be logged in to access this page</p>
  }

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Add email to user's profile in Supabase
      const { error } = await supabase.auth.updateUser({
        email: formState.email
      })

      if (error) throw error

      // Set to true to display second form
      // and capture the OTP code
      setIsVerifying(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification code
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.verify({
        email: formState.email,
        token: formState.code,
        type: 'email'
      })

      if (error) throw error
      setSuccessful(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a success message if the email was added successfully
  if (successful) {
    return (
      <Box className="container-content py-8">
        <Paper className="surface p-6">
          <Box className="flex-center flex-col gap-4">
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <Typography variant="h4" component="h1">
              Email Added Successfully
            </Typography>
            <Typography color="text.secondary">
              Your email has been added to your account
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  }

  // Display the verification form to capture the OTP code
  if (isVerifying) {
    return (
      <Box className="container-content py-8">
        <Paper className="surface p-6">
          <form onSubmit={verifyCode} className="space-y-6">
            <Box className="flex-center flex-col gap-4">
              <EmailIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h4" component="h1">
                Verify Your Email
              </Typography>
              <Typography color="text.secondary">
                Enter the verification code sent to {formState.email}
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
              onChange={e => setFormState(prev => ({ ...prev, code: e.target.value }))}
              disabled={formState.isSubmitting}
              placeholder="Enter verification code"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formState.isSubmitting || !formState.code}
              startIcon={formState.isSubmitting ? <CircularProgress size={20} /> : <EmailIcon />}
            >
              {formState.isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        </Paper>
      </Box>
    )
  }

  // Display the initial form to capture the email address
  return (
    <Box className="container-content py-8">
      <Paper className="surface p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Box className="flex-center flex-col gap-4">
            <EmailIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h4" component="h1">
              Add Email Address
            </Typography>
            <Typography color="text.secondary">
              Add an additional email address to your account
            </Typography>
          </Box>

          {formState.error && (
            <Alert severity="error" className="mt-4">
              {formState.error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email Address"
            value={formState.email}
            onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
            disabled={formState.isSubmitting}
            type="email"
            placeholder="Enter your email address"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={formState.isSubmitting || !formState.email}
            startIcon={formState.isSubmitting ? <CircularProgress size={20} /> : <EmailIcon />}
          >
            {formState.isSubmitting ? 'Adding...' : 'Add Email'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
