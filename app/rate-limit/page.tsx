'use client';

import {FadeIn} from '@/components/animations/fade-in';
import {Box, Button, Container, Typography} from '@mui/material';
import {Clock} from 'react-feather';

export default function RateLimitPage() {
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <FadeIn delay={0.2}>
          <Clock
            size={80}
            style={{
              color: '#007FFF',
              marginBottom: '2rem',
            }}
          />
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Too Many Requests
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Typography variant='h6' gutterBottom>
            Please slow down and try again later
          </Typography>
        </FadeIn>

        <FadeIn delay={0.8}>
          <Typography variant='body1' color='text.secondary' sx={{maxWidth: 'sm', mb: 4}}>
            You've made too many requests in a short period. Please wait a moment before trying
            again.
          </Typography>
        </FadeIn>

        <FadeIn delay={1}>
          <Button
            variant='contained'
            onClick={() => window.location.reload()}
            sx={{
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
              },
            }}
          >
            Try Again
          </Button>
        </FadeIn>
      </Box>
    </Container>
  );
}
