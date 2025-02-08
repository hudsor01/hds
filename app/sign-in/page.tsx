import { Container, Typography } from '@mui/material';
import SignInForm from '@/components/auth/sign-in-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Property Manager',
  description: 'Sign in to your Property Manager account',
};

export default function SignInPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome back
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Sign in to your account to continue
      </Typography>
      <SignInForm />
    </Container>
  );
}
