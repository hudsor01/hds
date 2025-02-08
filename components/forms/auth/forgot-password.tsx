import { ForgotPasswordForm } from '@/components/forms/auth/ForgotPasswordForm';
import { Box, Container, Typography } from '@mui/material';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password by entering your email address',
};

export default function ForgotPasswordPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Forgot your password?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
        </Box>
        <ForgotPasswordForm />
      </Box>
    </Container>
  );
}
