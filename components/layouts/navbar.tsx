'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  Skeleton,
  Avatar
} from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import type { AppDispatch } from '../../store'
import { signOut } from '../../store/slices/authSlice'

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Testimonials', href: '/testimonials' }
]

export default function Navbar() {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(state => state.auth)

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null)

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null)
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null)
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    handleMobileMenuClose()
    handleUserMenuClose()
  }

  const handleSignOut = async () => {
    try {
      await dispatch(signOut())
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider'
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.5rem'
            }}
          >
            Hudson Digital Solutions
          </Typography>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.2rem'
            }}
          >
            Hudson Digital Solutions
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {mobileMenuAnchorEl ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={mobileMenuAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {navigationLinks.map(item => (
                <MenuItem key={item.name} onClick={() => handleNavigation(item.href)}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navigationLinks.map(item => (
              <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    my: 2,
                    mx: 1,
                    color: 'inherit',
                    display: 'block',
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoading ? (
              <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
            ) : user ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    p: 0,
                    ml: 2,
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Avatar
                    alt={user.email || ''}
                    src={typeof user.user_metadata?.avatar_url === 'string' ? user.user_metadata?.avatar_url : ''}
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {user.email?.[0].toUpperCase() || <AccountCircleIcon />}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={Boolean(userMenuAnchorEl)}
                  onClose={handleUserMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                      mt: 1.5,
                      minWidth: 200,
                      '& .MuiMenuItem-root': {
                        px: 2,
                        py: 1
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.user_metadata?.full_name || 'User'}
                    </Typography>
                  </Box>
                  <MenuItem onClick={() => handleNavigation('/dashboard')}>Dashboard</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
                  <MenuItem onClick={() => void handleSignOut()}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} href="/auth/sign-in" variant="text" color="inherit" sx={{ mr: 2 }}>
                  Sign In
                </Button>
                <Button component={Link} href="/auth/sign-up" variant="contained" color="primary">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
