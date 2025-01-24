'use client'

import { Icon } from '@/components/ui/icon'
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const features = [
  {
    title: 'Property Management',
    description: 'Streamline your property operations with our comprehensive management tools',
    icon: '🏢',
    color: 'primary.light'
  },
  {
    title: 'Tenant Portal',
    description: 'Give your tenants a modern platform to manage their rental experience',
    icon: '👥',
    color: 'secondary.light'
  },
  {
    title: 'Financial Analytics',
    description: 'Make data-driven decisions with our powerful analytics dashboard',
    icon: '📊',
    color: 'success.light'
  },
  {
    title: 'Maintenance Tracking',
    description: 'Keep your properties in top condition with our maintenance system',
    icon: '🔧',
    color: 'info.light'
  },
  {
    title: 'Document Management',
    description: 'Securely store and manage all your property-related documents',
    icon: '📄',
    color: 'warning.light'
  },
  {
    title: 'Smart Automation',
    description: 'Automate routine tasks and improve operational efficiency',
    icon: '⚡',
    color: 'error.light'
  }
]

const pricingTiers = [
  {
    title: 'Starter',
    price: '$49',
    features: ['Up to 10 properties', 'Basic analytics', 'Email support'],
    recommended: false
  },
  {
    title: 'Professional',
    price: '$99',
    features: ['Up to 50 properties', 'Advanced analytics', 'Priority support', 'Custom reports'],
    recommended: true
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited properties', 'Custom solutions', '24/7 support', 'Dedicated manager'],
    recommended: false
  }
]

export default function HomePage() {
  const theme = useTheme()

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 10, md: 15 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div {...fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Modern Property Management Solution
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
                Streamline your property management with our powerful platform. Built for modern property managers.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  href="/auth/register"
                  variant="contained"
                  size="large"
                  endIcon={<Icon name="arrow-right" />}
                  sx={{
                    borderRadius: '12px',
                    py: 1.5,
                    px: 3,
                    fontSize: '1.1rem'
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: '12px',
                    py: 1.5,
                    px: 3,
                    fontSize: '1.1rem'
                  }}
                >
                  Contact Sales
                </Button>
              </Stack>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ position: 'relative', height: '400px' }}>
                <Image
                  src="/dashboard-preview.jpg"
                  alt="Dashboard Preview"
                  fill
                  style={{
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                  priority
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: { xs: 6, md: 8 },
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      bgcolor: 'background.default',
                      boxShadow: 1,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 3,
                        bgcolor: feature.color,
                      }
                    }}
                  >
                    <Typography variant="h1" sx={{ mb: 2, fontSize: '3rem' }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
                  Ready to Transform Your Property Management?
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Join thousands of property managers who trust our platform
                </Typography>
                <Button
                  component={Link}
                  href="/auth/register"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '12px',
                    py: 2,
                    px: 4,
                    fontSize: '1.1rem',
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Start Your Free Trial
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
