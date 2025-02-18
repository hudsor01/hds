'use client'

import { useRouter } from 'next/navigation'
import { Box, Container, Typography, Button, Paper, useTheme, alpha } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  Home as HomeIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Apartment as ApartmentIcon,
  TrendingUp as TrendingUpIcon,
  SupportAgent as SupportIcon,
  Speed as SpeedIcon,
  DeviceHub as IntegrationIcon
} from '@mui/icons-material'

export default function Home() {
  const router = useRouter()
  const theme = useTheme()

  const features = [
    {
      icon: <ApartmentIcon />,
      title: 'Property Management',
      description: 'Efficiently manage your properties, units, and tenants all in one place.'
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensuring your data is always protected.'
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Advanced Analytics',
      description: 'Make data-driven decisions with real-time insights and reporting.'
    },
    {
      icon: <SupportIcon />,
      title: '24/7 Support',
      description: 'Dedicated support team ready to assist you around the clock.'
    },
    {
      icon: <SpeedIcon />,
      title: 'Performance',
      description: 'Lightning-fast performance optimized for large property portfolios.'
    },
    {
      icon: <IntegrationIcon />,
      title: 'Integrations',
      description: 'Seamlessly integrate with your existing tools and workflows.'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 }
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark}), 
                        linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark})`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={6}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 2
                  }}
                >
                  Transform Your Property Management
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400
                  }}
                >
                  Streamline operations, boost efficiency, and enhance tenant satisfaction with our comprehensive solution.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      router.push('/sign-up')
                    }}
                    sx={{
                      bgcolor: 'background.paper',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.9)
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      router.push('/demo')
                    }}
                    sx={{
                      borderColor: 'primary.contrastText',
                      color: 'primary.contrastText',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: 'primary.contrastText',
                        bgcolor: alpha(theme.palette.primary.contrastText, 0.1)
                      }
                    }}
                  >
                    View Demo
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <HomeIcon
                  sx={{
                    fontSize: { xs: 200, md: 300 },
                    opacity: 0.9,
                    filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.2))'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 700,
            mb: { xs: 6, md: 8 },
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Powerful Features for Modern Property Management
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                      color: 'primary.main'
                    }
                  }
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    transition: 'all 0.3s ease-in-out',
                    '& > svg': {
                      fontSize: 40
                    }
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 3
              }}
            >
              Ready to Transform Your Property Management?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Join thousands of property managers who are already streamlining their operations with our platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                router.push('/sign-up')
              }}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
