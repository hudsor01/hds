'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Slide from '@mui/material/Slide'
import Divider from '@mui/material/Divider'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
] as const

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['background-color', 'box-shadow']),
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  [theme.breakpoints.up('sm')]: {
    minHeight: 70,
  },
}))

const LogoButton = styled(Button)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  fontWeight: 700,
  letterSpacing: '0.1rem',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'transparent',
  },
}))

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}))

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const mobileMenu = (
    <MobileDrawer
      anchor="right"
      open={mobileOpen}
      onClose={handleMobileToggle}
      ModalProps={{ keepMounted: true }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={handleMobileToggle}
          aria-label="close menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <List>
        {navLinks.map(({ href, label }) => (
          <ListItem key={href} disablePadding>
            <NextLink href={href} passHref style={{ width: '100%' }}>
              <ListItemButton 
                selected={pathname === href}
                onClick={handleMobileToggle}
              >
                <ListItemText 
                  primary={label}
                  primaryTypographyProps={{
                    color: pathname === href ? 'primary' : 'textSecondary',
                  }}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
        <ListItem sx={{ mt: 2 }}>
          <NextLink href="/sign-in" passHref style={{ width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleMobileToggle}
            >
              Sign In
            </Button>
          </NextLink>
        </ListItem>
      </List>
    </MobileDrawer>
  )

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <StyledAppBar 
        position="sticky"
        elevation={trigger ? 1 : 0}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <NextLink href="/" passHref legacyBehavior>
                <LogoButton component="a">
                  HDS
                </LogoButton>
              </NextLink>
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
                <NextLink key={href} href={href} passHref legacyBehavior>
                  <NavButton
                    component="a"
                    active={pathname === href}
                  >
                    {label}
                  </NavButton>
                </NextLink>
              ))}

              <NextLink href="/sign-in" passHref legacyBehavior>
                <Button
                  component="a"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Sign In
                </Button>
              </NextLink>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open menu"
              onClick={handleMobileToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Slide>
  )
}
