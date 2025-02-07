'use client';

import {Box, Button, Container, Typography} from '@mui/material';
import Link from 'next/link';
import {LogIn, Shield} from 'react-feather';

export default function UnauthorizedPage() {
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
        <Shield
          size={80}
          style={{
            color: '#007FFF',
            marginBottom: '2rem',
          }}
        />
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
          Access Denied
        </Typography>
        <Typography variant='h6' gutterBottom>
          You don't have permission to access this page
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{maxWidth: 'sm', mb: 4}}>
          Please sign in with an account that has the necessary permissions, or contact your
          administrator for access.
        </Typography>
        <Box sx={{display: 'flex', gap: 2}}>
          <Link href='/sign-in' passHref style={{textDecoration: 'none'}}>
            <Button
              variant='contained'
              startIcon={<LogIn size={20} />}
              sx={{
                background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
                },
              }}
            >
              Sign In
            </Button>
          </Link>
          <Button
            variant='outlined'
            href='mailto:support@example.com'
            sx={{
              borderColor: '#007FFF',
              color: '#007FFF',
              '&:hover': {
                borderColor: '#0059B2',
                color: '#0059B2',
              },
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
