'use client'

import { Menu as MenuIcon } from '@mui/icons-material'
import
    {
        AppBar,
        Box,
        Button,
        Container,
        IconButton,
        Menu,
        MenuItem,
        Toolbar,
        Typography,
        useTheme
    } from '@mui/material'
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const { data: session } = useSession()
  const theme = useTheme()
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null)
  }

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 1 : 0}
      sx={{
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                mr: 4,
                fontWeight: 700,
                color: theme.palette.primary.main,
                textDecoration: 'none',
                letterSpacing: '.1rem',
              }}
            >
              Hudson Digital
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button
                component={Link}
                href="/features"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Features
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                component={Link}
                href="/pricing"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Pricing
              </Button>
            </motion.div>
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {session ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="contained"
                  sx={{
                    px: 4,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Dashboard
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button
                    component={Link}
                    href="/login"
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Log in
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    component={Link}
                    href="/signup"
                    variant="contained"
                    sx={{
                      px: 4,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Sign up
                  </Button>
                </motion.div>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleCloseMobileMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  mt: 1.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <MenuItem onClick={handleCloseMobileMenu} component={Link} href="/features">
                Features
              </MenuItem>
              <MenuItem onClick={handleCloseMobileMenu} component={Link} href="/pricing">
                Pricing
              </MenuItem>
              {session ? (
                <MenuItem onClick={handleCloseMobileMenu} component={Link} href="/dashboard">
                  Dashboard
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleCloseMobileMenu} component={Link} href="/login">
                    Log in
                  </MenuItem>
                  <MenuItem onClick={handleCloseMobileMenu} component={Link} href="/signup">
                    Sign up
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
