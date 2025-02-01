'use client'

import { createClerkSupabaseClient } from '@/utils/supabase'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const supabase = createClerkSupabaseClient()
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, status: 'pending' }])

      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      setError('Failed to join waitlist. Please try again.')
      console.error('Waitlist error:', err)
    }
  }

  if (submitted) {
    return (
      <Container maxWidth="sm" className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Paper elevation={3} className="w-full p-8 space-y-8 hover-card animate-fade-in">
          <Box className="text-center">
            <Typography
              variant="h4"
              component="h1"
              className="gradient-text font-bold"
            >
              Thank You!
            </Typography>
            <Typography
              variant="body1"
              className="mt-4 text-muted-foreground"
            >
              We've added you to our waitlist. We'll notify you when we launch!
            </Typography>
          </Box>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Paper elevation={3} className="w-full p-8 space-y-8 hover-card">
        <Box className="text-center">
          <Typography
            variant="h4"
            component="h1"
            className="gradient-text font-bold"
          >
            Join the Waitlist
          </Typography>
          <Typography
            variant="body1"
            className="mt-2 text-muted-foreground"
          >
            Be the first to know when we launch
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />

          {error && (
            <Typography color="error" className="text-sm mt-2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-primary rounded-md py-3"
          >
            Join Waitlist
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
