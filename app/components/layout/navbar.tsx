'use client'

import
    {
        Info as AboutIcon,
        AccountCircle as AccountIcon,
        Mail as ContactIcon,
        Widgets as FeaturesIcon,
        Home as HomeIcon,
        Login as LoginIcon,
        Menu as MenuIcon,
        Paid as PricingIcon,
        PersonAdd as SignUpIcon
    } from '@mui/icons-material'
import
    {
        AppBar,
        Button,
        Container,
        IconButton,
        Stack,
        Toolbar,
        Typography
    } from '@mui/material'
import type { Route } from 'next'
import { useSession } from "next-auth/react"
import Link from "next/link"

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

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: COLORS.background,
        borderBottom: '1px solid',
        borderColor: COLORS.border,
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 }
          }}
        >
          {/* Logo */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: COLORS.text,
              '&:hover': {
                opacity: 0.9,
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            <HomeIcon
              sx={{
                color: COLORS.primary,
                fontSize: 28
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: `linear-gradient(120deg, ${COLORS.text} 0%, ${COLORS.textLight} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hudson Digital Solutions
            </Typography>
          </Stack>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              '& .MuiButton-root': {
                px: 2,
                py: 1,
                borderRadius: 1.5,
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)'
                }
              }
            }}
          >
            <Button
              component={Link}
              href="/about"
              startIcon={<AboutIcon />}
              sx={{
                color: COLORS.text,
                '&:hover': {
                  backgroundColor: COLORS.primaryLight,
                  color: COLORS.primaryDark,
                }
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              href="/features"
              startIcon={<FeaturesIcon />}
              sx={{
                color: COLORS.text,
                '&:hover': {
                  backgroundColor: COLORS.primaryLight,
                  color: COLORS.primaryDark,
                }
              }}
            >
              Features
            </Button>
            <Button
              component={Link}
              href="/pricing"
              startIcon={<PricingIcon />}
              sx={{
                color: COLORS.text,
                '&:hover': {
                  backgroundColor: COLORS.primaryLight,
                  color: COLORS.primaryDark,
                }
              }}
            >
              Pricing
            </Button>
            <Button
              component={Link}
              href="/contact"
              startIcon={<ContactIcon />}
              sx={{
                color: COLORS.text,
                '&:hover': {
                  backgroundColor: COLORS.primaryLight,
                  color: COLORS.primaryDark,
                }
              }}
            >
              Contact
            </Button>
          </Stack>

          {/* Auth Buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              '& .MuiButton-root': {
                borderRadius: 1.5,
                px: 2.5,
                py: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)'
                }
              }
            }}
          >
            {session ? (
              <Button
                component={Link}
                href="/account"
                startIcon={<AccountIcon />}
                sx={{
                  color: COLORS.text,
                  '&:hover': {
                    backgroundColor: COLORS.primaryLight,
                    color: COLORS.primaryDark,
                  }
                }}
              >
                Account
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: COLORS.text,
                    '&:hover': {
                      backgroundColor: COLORS.primaryLight,
                      color: COLORS.primaryDark,
                    }
                  }}
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  href="/signup"
                  variant="contained"
                  startIcon={<SignUpIcon />}
                  sx={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.background,
                    fontWeight: 600,
                    boxShadow: `0 4px 14px 0 ${COLORS.primary}40`,
                    '&:hover': {
                      backgroundColor: COLORS.primaryDark,
                      boxShadow: `0 6px 20px 0 ${COLORS.primary}60`,
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </Stack>

          {/* Mobile Navigation */}
          <IconButton
            component={Link}
            href={'/menu' as Route}
            size="large"
            edge="end"
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: COLORS.text,
              '&:hover': {
                backgroundColor: COLORS.primaryLight,
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
