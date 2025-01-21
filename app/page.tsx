'use client'

import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'react-feather'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const features = [
  {
    title: 'Property Management',
    description: 'Streamline your property operations with our comprehensive management tools',
    icon: '🏢'
  },
  {
    title: 'Tenant Portal',
    description: 'Give your tenants a modern platform to manage their rental experience',
    icon: '👥'
  },
  {
    title: 'Financial Analytics',
    description: 'Make data-driven decisions with our powerful analytics dashboard',
    icon: '📊'
  },
  {
    title: 'Maintenance Tracking',
    description: 'Keep your properties in top condition with our maintenance system',
    icon: '🔧'
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
      <Container maxWidth="lg" sx={{ mt: 12, mb: 15 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div {...fadeInUp}>
              <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700 }}>
                Modern Property Management Solution
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
                Streamline your property management with our powerful platform
              </Typography>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                sx={{ borderRadius: '12px', py: 1.5 }}
              >
                Get Started
              </Button>
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
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 15, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 8, fontWeight: 700 }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
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
                      boxShadow: theme.customShadows?.z8,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-8px)' }
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

      {/* Pricing Section */}
      <Box sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 8, fontWeight: 700 }}
          >
            Simple, Transparent Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {pricingTiers.map((tier, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                      bgcolor: tier.recommended ? 'primary.main' : 'background.paper',
                      color: tier.recommended ? 'primary.contrastText' : 'text.primary',
                      boxShadow: theme.customShadows?.z16,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {tier.recommended && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: -32,
                          transform: 'rotate(45deg)',
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          py: 0.5,
                          px: 4,
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        RECOMMENDED
                      </Box>
                    )}
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                      {tier.title}
                    </Typography>
                    <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                      {tier.price}
                      <Typography component="span" sx={{ fontSize: '1rem', ml: 1 }}>
                        /month
                      </Typography>
                    </Typography>
                    {tier.features.map((feature, featureIndex) => (
                      <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircle size={20} style={{ marginRight: '8px' }} />
                        <Typography>{feature}</Typography>
                      </Box>
                    ))}
                    <Button
                      fullWidth
                      variant={tier.recommended ? 'contained' : 'outlined'}
                      color={tier.recommended ? 'secondary' : 'primary'}
                      sx={{ mt: 4, borderRadius: '12px', py: 1.5 }}
                    >
                      Get Started
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
