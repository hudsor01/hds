'use client'

import { PublicLayout } from '@/components/public-layout'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardContent, Typography, Box, Container, useTheme, styled } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Home, People, Description, Settings, BarChart, AccessTime } from '@mui/icons-material'
import theme from './theme'

const features = [
  {
    icon: Home,
    title: 'Property Management',
    description: 'Streamline your property portfolio management with intuitive tools and real-time insights.'
  },
  {
    icon: People,
    title: 'Tenant Management',
    description: 'Efficiently handle tenant relationships from applications to lease management.'
  },
  {
    icon: Description,
    title: 'Document Handling',
    description: 'Digitize and organize all property-related documents in one secure location.'
  },
  {
    icon: Settings,
    title: 'Maintenance Tracking',
    description: 'Stay on top of property maintenance with automated scheduling and tracking.'
  },
  {
    icon: BarChart,
    title: 'Financial Analytics',
    description: 'Get detailed financial insights with comprehensive reporting and analytics.'
  },
  {
    icon: AccessTime,
    title: 'Automated Workflows',
    description: 'Save time with automated processes for rent collection and maintenance requests.'
  }
]

const stats = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '50%', label: 'Time Saved on Management' },
  { value: '35%', label: 'Increase in ROI' },
  { value: '24/7', label: 'Support Available' }
]

const FeatureCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create('transform'),
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6]
  }
}))

export default function HomePage() {
  const theme = useTheme()

  return (
    <PublicLayout>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 4, md: 12 },
          pb: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Manage Properties
              <br />
              with Confidence
            </Typography>

            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, mx: 'auto', maxWidth: 800 }}>
              A modern property management platform designed for residential property owners. Streamline your operations and boost
              efficiency.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 8 }}>
              <Button component={Link} href="/sign-up" variant="contained" size="large" sx={{ px: 4, py: 2, borderRadius: 8 }}>
                Get Started
              </Button>
              <Button component={Link} href="/features" variant="outlined" size="large" sx={{ px: 4, py: 2, borderRadius: 8 }}>
                Learn More
              </Button>
            </Box>
          </Box>

          {/* Dashboard Preview */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: 300, md: 500 },
              mx: 'auto',
              maxWidth: 1200,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 6
            }}
          >
            <Image src="/dashboard-preview.png" alt="HDS Platform Dashboard" fill style={{ objectFit: 'cover' }} priority />
          </Box>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      <feature.icon fontSize="large" />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index} sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </PublicLayout>
  )
}
