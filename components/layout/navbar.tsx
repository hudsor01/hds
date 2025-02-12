'use client'

import { gradientStyles } from '@/utils/styles'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn } from 'react-feather'

const publicNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                ...gradientStyles.text
              }}
            >
              Property Manager
            </Typography>
          </Link>

          {/* Center Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            {publicNavItems.map(item => (
              <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: pathname === item.href ? 'primary.main' : 'text.primary',
                    fontWeight: pathname === item.href ? 600 : 400,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Stack>

          {/* Right Side */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/sign-in" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                startIcon={<LogIn size={18} />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    ...gradientStyles.background
                  }
                }}
              >
                Sign In
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
