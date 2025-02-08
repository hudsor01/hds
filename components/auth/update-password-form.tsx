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
import { useRouter } from 'next/navigation';

interface UpdatePasswordFormProps {
  redirectTo?: string;
}

export default function UpdatePasswordForm({
  redirectTo = '/',
}: UpdatePasswordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
        Update your password
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Please enter your new password below.
      </Typography>

      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        helperText="Password must be at least 8 characters long"
      />

      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        error={password !== confirmPassword && confirmPassword !== ''}
        helperText={
          password !== confirmPassword && confirmPassword !== ''
            ? 'Passwords do not match'
            : ' '
        }
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
        {isLoading ? <CircularProgress size={24} /> : 'Update Password'}
      </Button>
    </Box>
  );
}
