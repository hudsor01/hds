'use client'

import { Container, Typography } from '@mui/material'
import SignInForm from '@/components/auth/sign-in-form'
import { useSearchParams, useRouter } from 'next/navigation'
import { getRedirectUrl } from '@/utils/auth-redirect'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectUrl = getRedirectUrl(searchParams)

  const handleSuccess = () => {
    router.push(redirectUrl)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome back
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Sign in to your account to continue
      </Typography>
      <SignInForm onSuccess={handleSuccess} />
    </Container>
  )
}
