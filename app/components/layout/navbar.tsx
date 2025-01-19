'use client'

import
    {
        Dashboard as DashboardIcon,
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
        Box,
        Button,
        Container,
        IconButton,
        Stack,
        Toolbar,
        Typography,
        useTheme
    } from '@mui/material'
import type { Route } from 'next'
import { useSession } from "next-auth/react"
import Link from "next/link"

const PASTEL_BLUE = '#B7DCFF'
const PASTEL_BLUE_LIGHT = '#D5EAFF'
const PASTEL_BLUE_DARK = '#86B7FF'

export default function Navbar() {
  const { data: session } = useSession()
  const theme = useTheme()

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.100'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { opacity: 0.9 }
            }}
          >
            <HomeIcon sx={{ color: PASTEL_BLUE }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                letterSpacing: '-0.02em',
              }}
            >
              Hudson Digital
            </Typography>
          </Stack>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Button
              component={Link}
              href="/features"
              startIcon={<FeaturesIcon />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: PASTEL_BLUE_LIGHT,
                  color: PASTEL_BLUE_DARK,
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
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: PASTEL_BLUE_LIGHT,
                  color: PASTEL_BLUE_DARK,
                }
              }}
            >
              Pricing
            </Button>

            {session ? (
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                startIcon={<DashboardIcon />}
                sx={{
                  ml: 2,
                  backgroundColor: PASTEL_BLUE,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: PASTEL_BLUE_DARK,
                  }
                }}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: PASTEL_BLUE_LIGHT,
                      color: PASTEL_BLUE_DARK,
                    }
                  }}
                >
                  Log in
                </Button>
                <Button
                  component={Link}
                  href="/signup"
                  variant="contained"
                  startIcon={<SignUpIcon />}
                  sx={{
                    backgroundColor: PASTEL_BLUE,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: PASTEL_BLUE_DARK,
                    }
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Stack>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Link href={'/menu' as Route} style={{ textDecoration: 'none' }}>
              <IconButton
                size="large"
                edge="end"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: PASTEL_BLUE_LIGHT,
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
