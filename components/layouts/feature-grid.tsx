'use client'

import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsIcon from '@mui/icons-material/Settings'
import BrushIcon from '@mui/icons-material/Brush'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { styled } from '@mui/material/styles'

const features = [
  {
    name: 'Elegant Dark Mode',
    description:
      'Switch seamlessly between light and dark themes. Our modern UI adapts to your preferences while maintaining perfect readability and aesthetics.',
    icon: DarkModeIcon
  },
  {
    name: 'Easy Customization',
    description:
      'Tailor the platform to your needs with our intuitive customization options. Adapt workflows, reports, and interfaces to match your business processes.',
    icon: SettingsIcon
  },
  {
    name: 'Modern Design',
    description:
      'Experience a clean, intuitive interface that makes property management a breeze. Our modern design focuses on efficiency and user experience.',
    icon: BrushIcon
  }
]

const StyledSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(10, 0)
}))

const StyledFeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.light}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}))

const StyledIconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& svg': {
    fontSize: 32
  }
}))

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  borderRadius: '9999px',
  padding: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}))

export function FeatureGrid() {
  return (
    <StyledSection>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          explore our{' '}
          <Box component="span" sx={{ 
            borderBottom: theme => `4px solid ${theme.palette.primary.light}` 
          }}>
            Features
          </Box>
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          Discover how our property management platform can transform your business with these powerful features.
        </Typography>

        <Grid container spacing={4}>
          {features.map(feature => {
            const Icon = feature.icon
            return (
              <Grid item xs={12} md={6} lg={4} key={feature.name}>
                <StyledFeatureCard elevation={0}>
                  <StyledIconWrapper>
                    <Icon />
                  </StyledIconWrapper>

                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {feature.name}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {feature.description}
                  </Typography>

                  <StyledLink href="/features">
                    <ArrowCircleRightIcon />
                  </StyledLink>
                </StyledFeatureCard>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </StyledSection>
  )
}
