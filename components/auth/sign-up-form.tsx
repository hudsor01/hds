'use client'

import { useState } from 'react'
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import Link from 'next/link'

interface SignUpFormProps {
  redirectTo?: string
}

export default function SignUpForm({ redirectTo = '/' }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Check your email
        </Typography>
        <Typography color="text.secondary">
          We've sent you a confirmation link. Please check your email to complete your registration.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 'sm',
        mx: 'auto',
        p: 3
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        helperText="Password must be at least 8 characters long"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          height: 48,
          background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
          }
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link href="/sign-in" style={{ color: '#007FFF', textDecoration: 'none' }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
