import { Container, Typography } from '@mui/material'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Update Password | Property Manager',
  description: 'Update your Property Manager account password'
}

export default function UpdatePasswordPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update your password
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Please enter your new password below
      </Typography>
      <UpdatePasswordForm />
    </Container>
  )
}
