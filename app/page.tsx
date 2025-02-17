'use client'

import Testimonials from '@/app/testimonials/page'
import { FAQSection } from '@/components/layouts/sections/faq-section'
import { HeroSection } from '@/components/layouts/sections/hero-section'
import { PricingSection } from '@/components/layouts/sections/pricing-section'
import { useWaitlist } from '@/hooks/use-waitlist'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme, type Theme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import React, { useState, type FormEvent } from 'react'
import { BarChart, DollarSign, FileText, Home, Settings, Users } from 'react-feather'

const coreFeatures = [
  {
    icon: Home,
    title: 'Property Management',
    description: 'Comprehensive tools for managing multiple properties, from occupancy tracking to maintenance scheduling.'
  },
  {
    icon: Users,
    title: 'Tenant Management',
    description: 'Streamline tenant applications, screening, and ongoing communication in one place.'
  },
  {
    icon: DollarSign,
    title: 'Financial Tools',
    description: 'Automated rent collection, expense tracking, and financial reporting for better profitability.'
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description: 'Efficient maintenance request handling and vendor management system.'
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Digital storage and management of leases, contracts, and important property documents.'
  },
  {
    icon: BarChart,
    title: 'Analytics & Reporting',
    description: 'Data-driven insights and customizable reports for informed decision-making.'
  }
]

const statisticsData = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '24/7', label: 'Customer Support' },
  { value: '50K+', label: 'Properties Managed' },
  { value: '30+', label: 'Countries Served' }
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
}

export default function Page() {
  const theme = useTheme()
  const { addToWaitlist, loading } = useWaitlist()
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await addToWaitlist(email)
    if (result.success) {
      setShowSuccess(true)
      setEmail('')
    }
  }

  const [localError, setLocalError] = useState<string | null>(null)

  function handleSetError(value: string | null): void {
    setLocalError(value)
  }
  return (
    <Box component="main">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <HeroSection />
      </motion.div>

      {/* Statistics Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'background.default'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {statisticsData.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box textAlign="center">
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Core Features Grid */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.paper'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 8,
              fontWeight: 700
            }}
          >
            Core Features
          </Typography>
          <Grid container spacing={4}>
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        bgcolor: 'transparent',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: `${theme.palette.primary.main}15`,
                            color: 'primary.main',
                            mb: 2
                          }}
                        >
                          <Icon size={24} />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Early Access Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: (theme: Theme) => theme.palette.primary.main,
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box textAlign="center">
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Get Early Access
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join our waitlist and be the first to experience the future of property management
              </Typography>
              <Box
                component="form"
                onSubmit={handleWaitlistSubmit}
                sx={{
                  display: 'flex',
                  gap: 2,
                  maxWidth: 500,
                  mx: 'auto',
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'transparent' }
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    px: 4,
                    '&:hover': {
                      bgcolor: 'secondary.dark'
                    }
                  }}
                >
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default'
        }}
      >
        <Testimonials />
      </Box>

      {/* FAQ Section */}
      <FAQSection />

      {/* Success/Error Snackbars */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => {
          setShowSuccess(false)
        }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully joined the waitlist! We&#39;ll notify you soon.
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!localError}
        autoHideDuration={6000}
        onClose={() => {
          handleSetError(null)
        }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {localError}
        </Alert>
      </Snackbar>
    </Box>
  )
}
