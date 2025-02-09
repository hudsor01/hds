'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Box, CircularProgress, Container, Typography } from '@mui/material'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            throw error
          }
          router.push(next)
        } catch (error) {
          console.error('Error exchanging code for session:', error)
          router.push('/login?error=Authentication failed')
        }
      }
    }

    handleCallback()
  }, [code, next, router])

  return (
    <Container maxWidth="sm" className="flex min-h-screen items-center justify-center">
      <Box className="text-center">
        <CircularProgress size={48} className="mb-4" />
        <Typography variant="h6">Completing authentication...</Typography>
        <Typography variant="body2" color="text.secondary">
          Please wait while we verify your credentials.
        </Typography>
      </Box>
    </Container>
  )
}
