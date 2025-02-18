'use client'

import { Box, Container, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { motion } from 'framer-motion'
import { PricingCard } from '@/components/pricing/pricing-card'

const pricingPlans = [
  {
    title: 'Free',
    price: 0,
    features: [
      '1 property included',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Community support',
      'Mobile app access'
    ],
    buttonText: 'Start for free',
    buttonVariant: 'outlined'
  },
  {
    title: 'Basic',
    price: 29,
    features: [
      'Up to 3 properties',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Email support',
      'Mobile app access'
    ],
    buttonText: 'Start free trial',
    buttonVariant: 'outlined'
  },
  {
    title: 'Professional',
    price: 79,
    recommended: true,
    features: [
      'Up to 8 properties',
      'Advanced analytics',
      'Maintenance tracking',
      'Online rent collection',
      'Priority support',
      'Custom reporting',
      'API access'
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited properties',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Training sessions',
      'Custom workflows'
    ],
    buttonText: 'Contact sales',
    buttonVariant: 'outlined'
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export default function PricingPage() {
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 8, sm: 12, md: 16 },
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, sm: 8, md: 10 } }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Simple, Transparent Pricing
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Choose the perfect plan for your property management needs. All plans include a 14-day free trial.
            </Typography>
          </motion.div>
        </Box>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3} alignItems="stretch">
            {pricingPlans.map((plan, index) => (
              <Grid xs={12} sm={6} lg={3} key={plan.title}>
                <motion.div variants={cardVariants}>
                  <PricingCard plan={plan} isRecommended={plan.recommended} sx={{ height: '100%' }} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}
