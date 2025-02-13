import { Container, Typography } from '@mui/material'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password | Property Manager',
  description: 'Reset your Property Manager account password'
}

export default function ForgotPasswordPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Forgot your password?
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        No worries, we'll help you reset it
      </Typography>
      <ForgotPasswordForm />
    </Container>
  )
}
