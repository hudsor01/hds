'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Oops! Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please check the URL or navigate back home.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
}
