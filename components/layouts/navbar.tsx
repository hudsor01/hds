'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppBar, Container, Toolbar, Button, IconButton, Box, Slide, useScrollTrigger } from '@mui/material'
import { Menu, Close } from '@mui/icons-material'

// Define navLinks directly in component
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const trigger = useScrollTrigger()

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: trigger ? 1 : 0,
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/" passHref legacyBehavior>
                <Button
                  component="a"
                  sx={{
                    typography: 'h6',
                    color: 'text.primary',
                    fontWeight: 700,
                    letterSpacing: '.1rem'
                  }}
                >
                  HDS
                </Button>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 2,
                alignItems: 'center'
              }}
            >
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} passHref legacyBehavior>
                  <Button
                    component="a"
                    sx={{
                      color: pathname === href ? 'primary.main' : 'text.secondary',
                      fontWeight: pathname === href ? 600 : 400
                    }}
                  >
                    {label}
                  </Button>
                </Link>
              ))}

              <Button variant="contained" color="primary" component={Link} href="/sign-in" sx={{ ml: 2 }}>
                Sign In
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileToggle}
              sx={{ display: { md: 'none' } }}
            >
              {mobileOpen ? <Close /> : <Menu />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  )
}
