'use client'

import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

const pricingPlans = [
  {
    title: 'Starter',
    price: '29',
    features: ['Up to 10 properties', 'Basic reporting', 'Email support', 'Mobile app access', 'Document storage'],
    buttonText: 'Start Free Trial',
    highlighted: false
  },
  {
    title: 'Professional',
    price: '99',
    features: [
      'Up to 50 properties',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'Team collaboration'
    ],
    buttonText: 'Start Free Trial',
    highlighted: true
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited properties',
      'Custom solutions',
      'Dedicated support',
      'White-label options',
      'Advanced security',
      'Custom training'
    ],
    buttonText: 'Contact Sales',
    highlighted: false
  }
]

export function PricingSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper'
      }}
    >
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700
            }}
          >
            Simple, Transparent Pricing
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
            Choose the perfect plan for your property management needs
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    elevation={plan.highlighted ? 8 : 1}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {plan.title}
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
                        ${plan.price}
                      </Typography>
                      {plan.price !== 'Custom' && (
                        <Typography variant="subtitle1" component="span" color="text.secondary">
                          /month
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ mb: 4, flexGrow: 1 }}>
                      {plan.features.map((feature, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1
                          }}
                        >
                          <CheckIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                          <Typography variant="body1">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button variant={plan.highlighted ? 'contained' : 'outlined'} fullWidth size="large">
                      {plan.buttonText}
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}
