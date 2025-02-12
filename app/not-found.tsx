'use client'

import { FadeIn } from '@/components/animations/fade-in'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { Home, Search } from 'react-feather'

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <FadeIn delay={0.2}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '8rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            404
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'sm', mb: 4 }}>
            The page you're looking for doesn't exist or has been moved. Let's get you back on
            track.
          </Typography>
        </FadeIn>

        <FadeIn delay={0.8}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/dashboard" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<Home size={20} />}
                sx={{
                  background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                  }
                }}
              >
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/search" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                startIcon={<Search size={20} />}
                sx={{
                  borderColor: '#007FFF',
                  color: '#007FFF',
                  '&:hover': {
                    borderColor: '#0059B2',
                    color: '#0059B2'
                  }
                }}
              >
                Search Properties
              </Button>
            </Link>
          </Box>
        </FadeIn>
      </Box>
    </Container>
  )
}
