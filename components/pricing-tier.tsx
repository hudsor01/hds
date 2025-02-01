import { Box, Button, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'
import React from 'react'
import { Award, Check, Key, TrendingUp } from 'react-feather'

export default function PricingTier({
  title,
  price,
  features,
  highlighted = false
}: {
  title: string
  price: string
  features: string[]
  highlighted?: boolean
}) {
  const theme = useTheme()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={4}>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Box sx={{
            p: 4,
            height: '100%',
            borderRadius: 4,
            border: `2px solid ${highlighted ? theme.palette.primary.main : theme.palette.divider}`,
            bgcolor: highlighted ? 'primary.light' : 'background.paper',
            position: 'relative',
            overflow: 'hidden',
            '&:before': highlighted ? {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              transform: 'rotate(45deg)',
              zIndex: 0
            } : {}
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                {title === 'Starter' && <Key size={32} color={theme.palette.primary.main} />}
                {title === 'Professional' && <TrendingUp size={32} color={theme.palette.primary.main} />}
                {title === 'Enterprise' && <Award size={32} color={theme.palette.primary.main} />}
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
              </Box>

              <Typography variant="h2" sx={{ mb: 3, fontWeight: 800 }}>
                {price}
                {!price.includes('/') && (
                  <Typography component="span" color="text.secondary" sx={{ fontSize: '1.5rem', ml: 1 }}>
                    /month
                  </Typography>
                )}
              </Typography>

              <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 4 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                      color: 'text.primary'
                    }}
                  >
                    <Check size={20} color={theme.palette.success.main} />
                    <Typography>{feature}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant={highlighted ? 'contained' : 'outlined'}
                size="large"
                sx={{
                  borderRadius: 2,
                  py: 2,
                  fontWeight: 600,
                  ...(highlighted && {
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  })
                }}
              >
                Start Free Trial
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  )
}
