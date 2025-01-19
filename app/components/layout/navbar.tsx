'use client'

import { AppBar, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import type { Route } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Info as AboutIcon, Mail as ContactIcon, Settings as FeaturesIcon, DollarSign as PricingIcon } from 'react-feather'

const COLORS = {
  primary: '#7EB6FF',
  primaryLight: '#E3F0FF',
  primaryDark: '#4A90FF',
  text: '#1A202C',
  textLight: '#4A5568',
  background: '#FFFFFF',
  backgroundDark: '#F7FAFC',
  border: 'rgba(0,0,0,0.08)'
}

interface NavbarProps {
  scrolled: boolean
}

export function Navbar({ scrolled }: NavbarProps) {
  const { data: session } = useSession()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: 1,
        borderColor: COLORS.border,
        transition: 'all 0.2s ease-in-out',
        ...(scrolled && {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(12px)',
          bgcolor: 'rgba(255, 255, 255, 0.8)'
        })
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Link href={'/' as Route} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: COLORS.text
                }}
              >
                Hudson Digital Solutions
              </Typography>
            </Stack>
          </Link>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <Button
              component={Link}
              href={'/about' as Route}
              startIcon={<AboutIcon size={20} />}
              sx={{
                color: COLORS.textLight,
                px: 2,
                '&:hover': {
                  bgcolor: COLORS.primaryLight,
                  color: COLORS.primaryDark
                }
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              href={'/features' as Route}
              startIcon={<FeaturesIcon size={20} />}
              sx={{
                color: COLORS.textLight,
                px: 2,
                '&:hover': {
                  bgcolor: COLORS.primaryLight,
                  color: COLORS.primaryDark
                }
              }}
            >
              Features
            </Button>
            <Button
              component={Link}
              href={'/pricing' as Route}
              startIcon={<PricingIcon size={20} />}
              sx={{
                color: COLORS.textLight,
                px: 2,
                '&:hover': {
                  bgcolor: COLORS.primaryLight,
                  color: COLORS.primaryDark
                }
              }}
            >
              Pricing
            </Button>
            <Button
              component={Link}
              href={'/contact' as Route}
              startIcon={<ContactIcon size={20} />}
              sx={{
                color: COLORS.textLight,
                px: 2,
                '&:hover': {
                  bgcolor: COLORS.primaryLight,
                  color: COLORS.primaryDark
                }
              }}
            >
              Contact
            </Button>
          </Stack>

          {/* Auth Buttons */}
          <Stack direction="row" spacing={2}>
            {session?.user ? (
              <Button
                component={Link}
                href={'/dashboard' as Route}
                variant="contained"
                sx={{
                  bgcolor: COLORS.primary,
                  color: 'white',
                  '&:hover': {
                    bgcolor: COLORS.primaryDark
                  }
                }}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href={'/login' as Route}
                  sx={{
                    color: COLORS.textLight,
                    '&:hover': {
                      bgcolor: COLORS.primaryLight,
                      color: COLORS.primaryDark
                    }
                  }}
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  href={'/signup' as Route}
                  variant="contained"
                  sx={{
                    bgcolor: COLORS.primary,
                    color: 'white',
                    '&:hover': {
                      bgcolor: COLORS.primaryDark
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
