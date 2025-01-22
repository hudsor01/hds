'use client'

import { Box, Button, Container, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'react-feather'

const pricingTiers = [
  {
    title: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out our platform',
    features: [
      'Up to 3 properties',
      'Basic tenant portal',
      'Maintenance requests',
      'Document storage (1GB)',
      'Email support'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
    recommended: false
  },
  {
    title: 'Starter',
    price: '$49',
    period: 'per month',
    description: 'Great for small property managers',
    features: [
      'Up to 10 properties',
      'Advanced tenant portal',
      'Maintenance tracking',
      'Document storage (5GB)',
      'Basic analytics',
      'Email & chat support',
      'Mobile app access'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'outlined',
    recommended: false
  },
  {
    title: 'Professional',
    price: '$99',
    period: 'per month',
    description: 'Perfect for growing businesses',
    features: [
      'Up to 50 properties',
      'Premium tenant portal',
      'Advanced maintenance system',
      'Document storage (20GB)',
      'Advanced analytics',
      'Priority support',
      'Mobile app access',
      'Custom reports',
      'Team collaboration'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'contained',
    recommended: true
  },
  {
    title: 'Business',
    price: '$199',
    period: 'per month',
    description: 'For established property managers',
    features: [
      'Up to 150 properties',
      'White-label tenant portal',
      'Advanced maintenance system',
      'Document storage (50GB)',
      'Advanced analytics & forecasting',
      'Priority 24/7 support',
      'Mobile app access',
      'Custom reports & API access',
      'Team collaboration',
      'Automated workflows'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'outlined',
    recommended: false
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    period: 'per month',
    description: 'For large organizations',
    features: [
      'Unlimited properties',
      'Custom solutions',
      'White-label everything',
      'Unlimited storage',
      'Custom analytics',
      'Dedicated account manager',
      'Custom mobile app',
      'Full API access',
      'Advanced security',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outlined',
    recommended: false
  }
]

export default function PricingPage() {
  const theme = useTheme()

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 4, opacity: 0.9, maxWidth: '800px', mx: 'auto' }}
            >
              Choose the perfect plan for your property management needs. All plans include a 14-day free trial.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Pricing Cards */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 15, position: 'relative' }}>
        <Grid container spacing={3} alignItems="stretch">
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} md={tier.recommended ? 12 : 6} lg={tier.recommended ? 12 : 6} xl={tier.recommended ? 12 : 6} key={tier.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Paper
                  elevation={tier.recommended ? 12 : 4}
                  sx={{
                    p: 4,
                    height: '100%',
                    position: 'relative',
                    borderRadius: 4,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    ...(tier.recommended && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'scale(1.02)',
                    }),
                    '&:hover': {
                      transform: tier.recommended ? 'scale(1.03)' : 'scale(1.02)',
                      boxShadow: theme.shadows[tier.recommended ? 16 : 8],
                    },
                  }}
                >
                  {tier.recommended && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: -32,
                        transform: 'rotate(45deg)',
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText',
                        py: 0.5,
                        px: 4,
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}
                    >
                      RECOMMENDED
                    </Box>
                  )}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                      {tier.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      {tier.description}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h2" component="div" sx={{ fontWeight: 700 }}>
                      {tier.price}
                      <Typography component="span" variant="h6" sx={{ opacity: 0.8, ml: 1 }}>
                        /{tier.period}
                      </Typography>
                    </Typography>
                  </Box>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {tier.features.map((feature) => (
                      <Stack key={feature} direction="row" spacing={2} alignItems="center">
                        <Check size={20} />
                        <Typography>{feature}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      component={Link}
                      href={tier.title === 'Enterprise' ? '/contact' : '/auth/register'}
                      fullWidth
                      variant={tier.buttonVariant as 'contained' | 'outlined'}
                      size="large"
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        ...(tier.recommended && {
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'grey.100'
                          }
                        })
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 15 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Can I switch plans later?
                </Typography>
                <Typography color="text.secondary">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  What happens after my trial ends?
                </Typography>
                <Typography color="text.secondary">
                  After your 14-day trial, you'll be automatically switched to your selected plan. Don't worry, we'll remind you before the trial ends.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Do you offer custom solutions?
                </Typography>
                <Typography color="text.secondary">
                  Yes! Our Enterprise plan can be customized to meet your specific needs. Contact our sales team to discuss your requirements.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Is there a setup fee?
                </Typography>
                <Typography color="text.secondary">
                  No, there are no hidden fees or setup costs. You only pay the advertised price for your chosen plan.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
