'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { Alert, Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Google } from '@mui/icons-material'

interface SignInFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export default function SignInForm({ onSuccess, redirectTo = '/' }: SignInFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await signIn(formData.email, formData.password)
      if (error) throw error
      onSuccess?.()
      router.push(redirectTo)
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/auth/sign-in/google', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in with Google')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        p: 3,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        onClick={handleGoogleSignIn}
        variant="outlined"
        disabled={loading}
        startIcon={<Google />}
        sx={{
          height: 48,
          borderColor: '#4285F4',
          color: '#4285F4',
          '&:hover': {
            borderColor: '#357ABD',
            color: '#357ABD',
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Continue with Google'}
      </Button>

      <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

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
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          height: 48,
          background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link href="/sign-up" style={{ color: '#007FFF', textDecoration: 'none' }}>
            Sign up
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          <Link href="/forgot-password" style={{ color: '#007FFF', textDecoration: 'none' }}>
            Forgot your password?
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
