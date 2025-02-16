'use client'

import * as React from 'react'
import { createClient } from '@/utils/supabase/server'
import { Box, Button, Card, Chip, CardActions, CardContent, Container, Divider, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { AutoAwesome as AutoAwesomeIcon, CheckCircleRounded as CheckCircleRoundedIcon } from '@mui/icons-material'
import { PublicLayout } from '@/components/public-layout'
import { motion } from 'framer-motion'

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 property included',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Community support',
      'Mobile app access'
    ],
    buttonText: 'Start for free',
    buttonVariant: 'outlined',
    buttonColor: 'primary'
  },
  {
    title: 'Basic',
    price: '29',
    description: [
      'Up to 3 properties',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Email support',
      'Mobile app access'
    ],
    buttonText: 'Start free trial',
    buttonVariant: 'outlined',
    buttonColor: 'primary'
  },
  {
    title: 'Professional',
    subheader: 'Recommended',
    price: '79',
    description: [
      'Up to 8 properties',
      'Advanced analytics',
      'Maintenance tracking',
      'Online rent collection',
      'Priority support',
      'Custom reporting',
      'API access'
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
    buttonColor: 'secondary'
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: [
      'Unlimited properties',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Training sessions',
      'Custom workflows'
    ],
    buttonText: 'Contact sales',
    buttonVariant: 'outlined',
    buttonColor: 'primary'
  }
]

export default function PricingPage() {
  const [user, setUser] = React.useState<any>(null)
  const [products, setProducts] = React.useState<any[]>([])
  const [subscription, setSubscription] = React.useState<any>(null)
  const [selectedTier, setSelectedTier] = React.useState<string>('')
  const theme = useTheme()

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const [user, products, subscription] = await Promise.all([
        getUser(supabase),
        getProducts(supabase),
        getSubscription(supabase)
      ])

      setUser(user)
      setProducts(products ?? [])
      setSubscription(subscription)
    }

    fetchData()
  }, [])

  const getUser = async (supabase: any) => {
    // Add your logic here to fetch user data
    return null
  }

  const getSubscription = async (supabase: any) => {
    // Add your logic here to fetch subscription data
    return null
  }

  const getProducts = async (supabase: any) => {
    // Add your logic here to fetch products data
    return null
  }

  const handleTierSelect = (title: string) => {
    setSelectedTier(title)
  }

  return (
    <>
      {user && products && subscription && (
        <PublicLayout>
          <Container
            sx={{
              pt: { xs: 4, sm: 12 },
              pb: { xs: 8, sm: 16 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, sm: 6 }
            }}
          >
            <Box
              sx={{
                width: { sm: '100%', md: '60%' },
                textAlign: { sm: 'left', md: 'center' }
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Simple, Transparent Pricing
              </Typography>
              <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4 }}>
                Choose the perfect plan for your property management needs. All plans include a 14-day free trial.
              </Typography>
            </Box>

            <Grid
              container
              spacing={3}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              {tiers.map(tier => {
                const isSelected = selectedTier === tier.title

                return (
                  <Grid item xs={12} sm={6} md={3} key={tier.title}>
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                        y: isSelected ? -10 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        onClick={() => handleTierSelect(tier.title)}
                        sx={[
                          {
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            height: '100%',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[8]
                            }
                          },
                          isSelected && {
                            background: 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                            boxShadow: `0 8px 24px hsla(220, 20%, 42%, 0.3)`,
                            border: 'none',
                            '.MuiTypography-root': {
                              color: 'grey.100'
                            },
                            '.MuiDivider-root': {
                              borderColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }
                        ]}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              mb: 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 2
                            }}
                          >
                            <Typography component="h3" variant="h5">
                              {tier.title}
                            </Typography>
                            {tier.subheader && (
                              <Chip
                                icon={<AutoAwesomeIcon />}
                                label={tier.subheader}
                                color="primary"
                                sx={{
                                  bgcolor: isSelected ? 'primary.dark' : undefined
                                }}
                              />
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'baseline',
                              mb: 2
                            }}
                          >
                            <Typography component="h3" variant="h2">
                              {tier.price === 'Custom' ? (
                                'Custom'
                              ) : (
                                <>
                                  ${tier.price}
                                  <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{
                                      color: isSelected ? 'grey.300' : 'text.secondary'
                                    }}
                                  >
                                    /mo
                                  </Typography>
                                </>
                              )}
                            </Typography>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {tier.description.map(line => (
                            <Box
                              key={line}
                              sx={{
                                py: 1,
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'center'
                              }}
                            >
                              <CheckCircleRoundedIcon
                                sx={{
                                  width: 20,
                                  color: isSelected ? 'primary.light' : 'primary.main'
                                }}
                              />
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  color: isSelected ? 'grey.100' : 'text.secondary'
                                }}
                              >
                                {line}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                        <CardActions sx={{ mt: 'auto', p: 2 }}>
                          <Button
                            fullWidth
                            variant={isSelected ? 'contained' : (tier.buttonVariant as 'outlined' | 'contained')}
                            color={tier.buttonColor as 'primary' | 'secondary'}
                            size="large"
                            sx={{
                              py: 1.5,
                              fontSize: '1.1rem',
                              textTransform: 'none',
                              ...(isSelected && {
                                bgcolor: 'primary.light',
                                '&:hover': {
                                  bgcolor: 'primary.main'
                                }
                              })
                            }}
                          >
                            {tier.buttonText}
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        </PublicLayout>
      )}
    </>
  )
}
