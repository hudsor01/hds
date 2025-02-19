'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Box, TextField, Button, Divider, Alert, CircularProgress, Typography, FormControlLabel, Checkbox } from '@mui/material'
import { AuthForm } from '@/components/auth/AuthForm'
import supabase from '@/lib/supabase'

export default function SignUp() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value
    }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setLoading(true)

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      })
      if (signUpError) throw new Error(signUpError?.message ?? 'An unexpected error occurred')
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <AuthForm title="Create an Account">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <FormControlLabel
          control={<Checkbox name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} color="primary" />}
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link href="/terms" style={{ textDecoration: 'none', color: 'primary.main' }}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" style={{ textDecoration: 'none', color: 'primary.main' }}>
                Privacy Policy
              </Link>
            </Typography>
          }
          sx={{ mt: 2 }}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Divider sx={{ my: 2 }}>
            <Typography color="text.secondary" variant="body2">
              OR
            </Typography>
          </Divider>

          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/auth/sign-in" style={{ textDecoration: 'none' }}>
              <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthForm>
  )
}
