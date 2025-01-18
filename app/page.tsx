'use client'

import
  {
    People as PeopleIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon
  } from '@mui/icons-material'
import
  {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography,
    useTheme
  } from '@mui/material'
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()
  const theme = useTheme()

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1.5rem'
            }}
            component="a"
            href="/"
          >
            Hudson Digital Solutions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href="/features" color="inherit">Features</Button>
            <Button component={Link} href="/pricing" color="inherit">Pricing</Button>
            {session ? (
              <Button component={Link} href="/dashboard" variant="contained" color="primary">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button component={Link} href="/login" variant="outlined" color="primary">
                  Sign In
                </Button>
                <Button component={Link} href="/signup" variant="contained" color="primary">
                  Get Started
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Gradient Background */}
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        pt: 16,
        pb: 20,
        position: 'relative',
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white' }}>
            Transform Your Property Management
          </Typography>
          <Typography variant="h5" paragraph sx={{ maxWidth: 'md', mx: 'auto', mb: 6, color: 'white' }}>
            Streamline your property management with our comprehensive platform. From
            rent collection to maintenance requests, we've got you covered.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              href="/signup"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/features"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.9)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Powerful <Box component="span" sx={{ color: theme.palette.primary.main }}>Features</Box>
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Everything you need to manage your properties efficiently
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
                <Box sx={{
                  width: 48,
                  height: 48,
                  bgcolor: theme.palette.primary.light,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <SpeedIcon sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Smart Property Management
                </Typography>
                <Typography color="text.secondary">
                  Streamline your property operations with our intelligent management tools and automated workflows.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
                <Box sx={{
                  width: 48,
                  height: 48,
                  bgcolor: theme.palette.primary.light,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <SecurityIcon sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Secure Data Handling
                </Typography>
                <Typography color="text.secondary">
                  Your data is protected with enterprise-grade security and regular backups.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 4, height: '100%' }}>
                <Box sx={{
                  width: 48,
                  height: 48,
                  bgcolor: theme.palette.primary.light,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}>
                  <PeopleIcon sx={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Multi-tenant Support
                </Typography>
                <Typography color="text.secondary">
                  Manage multiple properties and tenants from a single, unified dashboard.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
