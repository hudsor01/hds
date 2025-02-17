'use client'

import { Box, Typography, TextField, Button, Alert, CircularProgress, Paper } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import type { ReactNode } from 'react'
import { useFormState } from '@/hooks/use-form-state'

interface VerificationFormProps {
  title: string
  description: string
  icon: ReactNode
  onSubmit: (value: string) => Promise<void>
  type: 'email' | 'phone'
  inputProps?: {
    placeholder?: string
    helperText?: string
    type?: string
  }
}

export function VerificationForm({ title, description, icon, onSubmit, type, inputProps }: VerificationFormProps) {
  const { state, setFormData, startSubmitting, setError, endSubmitting } = useFormState({
    value: '',
    code: '',
    step: 'input' as 'input' | 'verify' | 'success'
  })

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startSubmitting()
    try {
      await onSubmit(state.data.value)
      setFormData({ step: 'verify' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      endSubmitting()
    }
  }

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startSubmitting()
    try {
      // Verification logic here
      setFormData({ step: 'success' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      endSubmitting()
    }
  }

  if (state.data.step === 'success') {
    return (
      <Box className="container-content py-8"></Box>
        <Paper className="surface p-6">
          <Box className="flex-center flex-col gap-4">
            <CheckCircle color="success" sx={{ fontSize: 48 }} />
            <Typography variant="h4" component="h1">
              Verification Successful
            </Typography>
            <Typography color="text.secondary">
              Your {type} has been verified and added to your account
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  }

  return (
    <Box className="container-content py-8">
      <Paper className="surface p-6">
        <form onSubmit={state.data.step === 'input' ? handleInitialSubmit : handleVerifySubmit} className="space-y-6">
          <Box className="flex-center flex-col gap-4">
            {icon}
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Box>

          {state.error && (
            <Alert severity="error" className="mt-4"></Alert>
              {state.error}
            </Alert>
          )}

          {state.data.step === 'input' ? (
            <TextField
              fullWidth
              label={type === 'email' ? 'Email Address' : 'Phone Number'}
              value={state.data.value}
              onChange={e => setFormData({ value: e.target.value })}
              disabled={state.isSubmitting}
              {...inputProps}
            />
          ) : (
            <TextField
              fullWidth
              label="Verification Code"
              value={state.data.code}
              onChange={e => setFormData({ code: e.target.value })}
              disabled={state.isSubmitting}
              placeholder="Enter verification code"
              helperText={`Enter the code sent to your ${type}`}
            />
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={state.isSubmitting || !state.data[state.data.step === 'input' ? 'value' : 'code']}
            startIcon={state.isSubmitting ? <CircularProgress size={20} /> : icon}
          ></Button>
            {state.isSubmitting
              ? 'Submitting...'
              : state.data.step === 'input'
              ? `Add ${type === 'email' ? 'Email' : 'Phone'}`
              : 'Verify Code'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
