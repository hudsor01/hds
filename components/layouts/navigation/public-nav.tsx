'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, useMediaQuery, alpha } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

const navigationLinks = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Features', path: '/features' },
  { title: 'Pricing', path: '/pricing' },
  { title: 'Contact', path: '/contact' }
]

export function PublicNav() {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    handleMobileMenuClose()
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: (theme: Theme) => theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', height: 70 }}>
          {/* Logo */}
          <Box
            onClick={() => {
              router.push('/')
            }}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Add your logo here */}
            <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 40 }} />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {navigationLinks.map(link => (
                <Button
                  key={link.path}
                  onClick={() => {
                    handleNavigation(link.path)
                  }}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 2,
                    '&:hover': {
                      backgroundColor: alpha(String(theme.palette.primary.main), 0.08)
                    }
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isMobile && (
              <>
                <Button
                  onClick={() => {
                    router.push('/sign-in')
                  }}
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 3,
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor:
                        typeof theme.palette.primary.main === 'string' ? alpha(theme.palette.primary.main, 0.08) : undefined
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    router.push('/sign-up')
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMobileMenuOpen}>
                {mobileMenuAnchor ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{
              mt: 5,
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '100%',
                left: '0 !important',
                right: '0',
                borderRadius: 0,
                boxShadow: 1
              }
            }}
          >
            {navigationLinks.map(link => (
              <MenuItem
                key={link.path}
                onClick={() => {
                  handleNavigation(link.path)
                }}
                sx={{
                  py: 1.5,
                  justifyContent: 'center'
                }}
              >
                {link.title}
              </MenuItem>
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 2
              }}
            >
              <Button
                onClick={() => {
                  handleMobileMenuClose()
                  router.push('/sign-in')
                }}
                variant="outlined"
                fullWidth
                sx={{
                  py: 1,
                  textTransform: 'none'
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  handleMobileMenuClose()
                  router.push('/sign-up')
                }}
                variant="contained"
                fullWidth
                sx={{
                  py: 1,
                  textTransform: 'none'
                }}
              >
                Get Started
              </Button>
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
