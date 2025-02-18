'use client'

import { useState } from 'react'
import { Box, Card, CardContent, Typography, Button, useTheme, alpha } from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'

interface PricingCardProps {
  plan: {
    title: string
    price: number | string
    features: string[]
    buttonText: string
    buttonVariant: 'text' | 'outlined' | 'contained'
  }
  isRecommended?: boolean
  sx?: SxProps<Theme>
}

export function PricingCard({ plan, isRecommended, sx }: PricingCardProps) {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      sx={{
        position: 'relative',
        transition: theme.transitions.create(['transform', 'box-shadow'], { duration: theme.transitions.duration.shorter }),
        transform: isHovered ? 'translateY(-8px)' : 'none',
        ...(isRecommended
          ? {
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
              borderColor: 'primary.main',
              borderWidth: 2,
              borderStyle: 'solid'
            }
          : {
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[8]
              }
            }),
        ...sx
      }}
    >
      {isRecommended && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            py: 0.5,
            px: 1.5,
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            zIndex: 1,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: theme.transitions.create('transform')
          }}
        >
          Recommended
        </Box>
      )}

      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {plan.title}
        </Typography>

        <Box sx={{ my: 3, display: 'flex', alignItems: 'baseline' }}>
          <Typography
            component="span"
            variant="h3"
            sx={{
              fontWeight: 700,
              background: isRecommended
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`
                : 'none',
              backgroundClip: isRecommended ? 'text' : 'none',
              textFillColor: isRecommended ? 'transparent' : 'inherit',
              WebkitBackgroundClip: isRecommended ? 'text' : 'none',
              WebkitTextFillColor: isRecommended ? 'transparent' : 'inherit',
              transition: theme.transitions.create(['color', 'background'])
            }}
          >
            {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
          </Typography>
          {typeof plan.price === 'number' && (
            <Typography component="span" variant="subtitle1" color="text.secondary" sx={{ ml: 1 }}>
              /mo
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          {plan.features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1.5,
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shorter,
                  delay: index * 50
                })
              }}
            >
              <CheckIcon
                sx={{
                  mr: 1.5,
                  fontSize: 20,
                  color: isRecommended ? 'primary.main' : 'success.main',
                  transition: theme.transitions.create('transform'),
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  transition: theme.transitions.create('color'),
                  ...(isHovered && {
                    color: 'text.primary'
                  })
                }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          variant={plan.buttonVariant}
          color={isRecommended ? 'primary' : 'inherit'}
          sx={{
            py: 1.5,
            transition: theme.transitions.create(['background-color', 'box-shadow', 'transform', 'border-color']),
            '&:hover': {
              transform: 'scale(1.02)'
            },
            ...(!isRecommended && {
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.08)
              }
            })
          }}
        >
          {plan.buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}
