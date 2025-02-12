'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Box, Button, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { RefreshCw, Send } from 'react-feather'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest
    })
  }, [error])

  const isAuthError =
    error.message?.toLowerCase().includes('auth') ||
    error.message?.toLowerCase().includes('unauthorized')
  const isNetworkError =
    error.message?.toLowerCase().includes('network') ||
    error.message?.toLowerCase().includes('fetch')

  const getErrorTitle = () => {
    if (isAuthError) return 'Authentication Error'
    if (isNetworkError) return 'Network Error'
    return 'Something Went Wrong'
  }

  const getErrorMessage = () => {
    if (isAuthError)
      return 'There was a problem with your authentication. Please try signing in again.'
    if (isNetworkError)
      return 'There was a problem connecting to our servers. Please check your internet connection.'
    return 'We encountered an unexpected error. Our team has been notified and is working to fix the issue.'
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <FadeIn delay={0.2}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '8rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            {isAuthError ? '401' : '500'}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography variant="h4" gutterBottom>
            {getErrorTitle()}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'sm', mb: 4 }}>
            {getErrorMessage()}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.8}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isAuthError && (
              <Button
                variant="contained"
                startIcon={<RefreshCw size={20} />}
                onClick={reset}
                sx={{
                  background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                  }
                }}
              >
                Try Again
              </Button>
            )}
            {isAuthError && (
              <Button
                variant="contained"
                href="/sign-in"
                sx={{
                  background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                  }
                }}
              >
                Sign In
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<Send size={20} />}
              href="mailto:support@example.com"
              sx={{
                borderColor: '#007FFF',
                color: '#007FFF',
                '&:hover': {
                  borderColor: '#0059B2',
                  color: '#0059B2'
                }
              }}
            >
              Contact Support
            </Button>
          </Box>
        </FadeIn>
      </Box>
    </Container>
  )
}
