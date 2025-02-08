import { Container, Typography } from '@mui/material';
import SignUpForm from '@/components/auth/sign-up-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Property Manager',
  description: 'Create your Property Manager account',
};

export default function SignUpPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create an account
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Join Property Manager to start managing your properties
      </Typography>
      <SignUpForm />
    </Container>
  );
}
