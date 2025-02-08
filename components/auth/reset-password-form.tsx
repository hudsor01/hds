'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Check your email
        </Typography>
        <Typography color="text.secondary">
          We've sent you a password reset link. Please check your email to
          continue.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 'sm',
        mx: 'auto',
        p: 3,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Reset your password
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Enter your email address and we'll send you a link to reset your
        password.
      </Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          height: 48,
          background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Send Reset Link'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Remember your password?{' '}
          <Link
            href="/sign-in"
            style={{ color: '#007FFF', textDecoration: 'none' }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
