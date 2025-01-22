'use client'

import { Box, Button, Container, Stack } from '@mui/material'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on authenticated routes
  if (pathname.startsWith('/dashboard')) {
    return null
  }

  return (
    <Box
      component="nav"
      sx={{
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Hudson Digital Solutions
            </Box>
          </Link>

          <Stack direction="row" spacing={2} alignItems="center">
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                About
              </Box>
            </Link>
            <Link href="/features" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Features
              </Box>
            </Link>
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Pricing
              </Box>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Contact
              </Box>
            </Link>
            <Link href={'/auth/login' as Route} passHref>
              <Button
                variant="outlined"
                color="primary"
                size="small"
              >
                Sign In
              </Button>
            </Link>
            <Link href={'/auth/register' as Route} passHref>
              <Button
                variant="contained"
                color="primary"
                size="small"
              >
                Register for Free
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
