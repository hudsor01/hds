'use client';

import { Box, Typography, Button } from '@mui/material';
import { AuthForm } from '@/components/features/auth/components/AuthForm';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';

export default function VerifyEmail() {
  return (
    <AuthForm title="Verify Your Email">
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <MailCheck size={50} strokeWidth={1.5} style={{ marginBottom: '1rem', color: '#2563EB' }} />
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          We've sent you an email with a verification link. Please check your inbox and click the link to verify your account.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          If you don't see the email, check your spam folder or try signing in again to resend the verification email.
        </Typography>

        <Button
          component={Link}
          href="/auth/sign-in"
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
        >
          Return to Sign In
        </Button>

        <Typography variant="body2" color="text.secondary">
          Need help?{' '}
          <Link href="/contact" style={{ textDecoration: 'none', color: 'primary.main' }}>
            Contact Support
          </Link>
        </Typography>
      </Box>
    </AuthForm>
  );
}
