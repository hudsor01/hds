'use client'

import { Container, Typography } from '@mui/material'
import VerifyEmail from '@/components/waitlist/verify-email'
import { useRouter } from 'next/router'

export default function VerifyEmailPage() {
  const handleSuccess = (email: string) => {
    // You can add additional success handling here
    console.log('Email verified:', email)
  }

  const handleError = (error: string) => {
    // You can add additional error handling here
    console.error('Verification error:', error)
  }

  return (
    <Container maxWidth="md" className="py-12">
      <div className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-4">
          Email Verification
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="mb-8">
          Please wait while we verify your email address.
        </Typography>
      </div>

      <div className="max-w-md mx-auto">
        <VerifyEmail onSuccess={handleSuccess} onError={handleError} />
      </div>
    </Container>
  )
}
