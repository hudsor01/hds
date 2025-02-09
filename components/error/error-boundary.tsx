'use client';

import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { AlertTriangle } from 'react-feather';

interface ErrorBoundaryProps {
  error: Error;
  resetAction: () => void;
}

export default function ErrorBoundary({ error, resetAction }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
      <Typography variant="h4" gutterBottom>
        Something went wrong!
      </Typography>
      <Typography color="text.secondary" paragraph>
        {error.message || 'An unexpected error occurred. Please try again later.'}
      </Typography>
      <Button
        variant="contained"
        onClick={resetAction}
        sx={{
          mt: 2,
          background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
          },
        }}
      >
        Try again
      </Button>
    </Container>
  );
}
