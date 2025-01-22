'use client'

import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { Box, Button, Card, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography, alpha, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Check } from 'react-feather'

const pricingTiers = [
  {
    title: 'Free Trial',
    description: 'Perfect for evaluating our platform',
    price: 'Free',
    duration: '14 days',
    priceId: null,
    features: [
      'Up to 3 properties',
      'Basic tenant management',
      'Simple maintenance tracking',
      'Basic financial reporting',
      'Email support'
    ],
    highlighted: false
  },
  {
    title: 'Starter',
    description: 'For individual landlords and small portfolios',
    price: '$29',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER,
    features: [
      'Up to 10 properties',
      'Advanced tenant screening',
      'Maintenance request system',
      'Basic financial analytics',
      'Document storage',
      'Email & chat support',
      'Mobile app access'
    ],
    highlighted: false
  },
  {
    title: 'Professional',
    description: 'Ideal for growing property management businesses',
    price: '$49',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    features: [
      'Up to 50 properties',
      'Everything in Starter',
      'Automated rent collection',
      'Advanced financial analytics',
      'Document management',
      'Priority support',
      'Custom branding',
      'API access',
      'Team collaboration'
    ],
    highlighted: true
  },
  {
    title: 'Business',
    description: 'For established property management companies',
    price: '$99',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS,
    features: [
      'Up to 100 properties',
      'Everything in Professional',
      'Advanced reporting',
      'Bulk operations',
      'Custom workflows',
      'Premium support',
      'White-label options',
      'Advanced API access',
      'Multi-user roles',
      'Data exports'
    ],
    highlighted: false
  },
  {
    title: 'Enterprise',
    description: 'Full-featured solution for large property management companies',
    price: '$199',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
    features: [
      'Unlimited properties',
      'Everything in Business',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
      'Multi-user access',
      'Role-based permissions',
      'SLA guarantees',
      'White-label solution',
      'Bulk operations',
      'Custom reporting',
      'On-premise deployment option'
    ],
    highlighted: false
  }
]

export default function PricingPage() {
  const theme = useTheme()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Stack spacing={4} alignItems="center" textAlign="center" maxWidth="md" mx="auto" mb={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Simple, transparent pricing
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Choose the perfect plan for your property management needs
          </Typography>
        </motion.div>
      </Stack>

      <Grid container spacing={4} alignItems="stretch">
        {pricingTiers.map((tier, index) => (
          <Grid item xs={12} md={4} key={tier.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ height: '100%' }}
            >
              <Card
                component={Paper}
                elevation={tier.highlighted ? 8 : 1}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  ...(tier.highlighted && {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    bgcolor: alpha(theme.palette.primary.main, 0.03)
                  })
                }}
              >
                {tier.highlighted && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      px: 2,
                      py: 0.5,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    Most Popular
                  </Box>
                )}

                <Stack spacing={2}>
                  <Typography variant="h4" component="h2" fontWeight="bold">
                    {tier.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                    {tier.description}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    <Typography variant="h3" component="div" fontWeight="bold">
                      {tier.price}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {tier.duration}
                    </Typography>
                  </Box>

                  <List disablePadding sx={{ mb: 3, flexGrow: 1 }}>
                    {tier.features.map((feature) => (
                      <ListItem key={feature} disableGutters disablePadding sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Check size={20} color={theme.palette.success.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            sx: { fontSize: '0.875rem' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {tier.priceId ? (
                    <StripeCheckoutButton
                      priceId={tier.priceId}
                      variant={tier.highlighted ? 'contained' : 'outlined'}
                      size="large"
                    />
                  ) : (
                    <Button
                      variant={tier.highlighted ? 'contained' : 'outlined'}
                      size="large"
                      href="/auth/register"
                    >
                      Start Free Trial
                    </Button>
                  )}
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" component="div" gutterBottom>
          Enterprise Features
        </Typography>
        <Typography color="text.secondary" maxWidth="md" mx="auto">
          Need a custom solution? Our enterprise plan includes dedicated support, custom integrations,
          and advanced features tailored to your specific needs. Contact us to learn more.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          href="mailto:sales@hudsondigitalsolutions.com"
          sx={{ mt: 2 }}
        >
          Contact Sales
        </Button>
      </Box>
    </Container>
  )
}
