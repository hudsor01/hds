'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography, Card, CardContent, Button, useTheme, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Home, Users, FileText, Settings, BarChart, Clock, Shield, Smartphone, DollarSign } from 'react-feather'
import { PublicLayout } from '@/components/public-layout'
import { toast } from 'sonner'
import Image from 'next/image'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
}

export default function FeaturesPage() {
  const theme = useTheme()

  const handleDemoRequest = () => {
    toast.success('Demo request received! Our team will contact you shortly.')
  }

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

  const advancedFeatures = [
    {
      title: 'Automated Workflows',
      description: 'Streamline repetitive tasks with customizable automation rules',
      icon: Clock,
      benefits: [
        'Automatic rent reminders',
        'Scheduled maintenance notifications',
        'Payment processing automation',
        'Document renewal alerts'
      ]
    },
    {
      title: 'Mobile Optimization',
      description: 'Manage your properties on the go with our mobile-first platform',
      icon: Smartphone,
      benefits: ['Native mobile apps', 'Real-time notifications', 'Mobile document signing', 'On-site inspection tools']
    },
    {
      title: 'Security Features',
      description: 'Enterprise-grade security to protect your data and privacy',
      icon: Shield,
      benefits: ['Role-based access control', 'Data encryption', 'Audit logging', 'Regular security updates']
    }
  ]

  const integrations = [
    {
      name: 'Payments',
      description: 'Secure payment processing with Stripe and PayPal integration'
    },
    {
      name: 'Accounting',
      description: 'Seamless sync with QuickBooks and Xero'
    },
    {
      name: 'Communication',
      description: 'Integration with email and SMS platforms'
    },
    {
      name: 'Documents',
      description: 'E-signature support via DocuSign'
    }
  ]

  return (
    <PublicLayout
      title="Features - HDS Platform"
      description="Explore the comprehensive features of HDS Platform designed for modern property management."
    >
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          textAlign: 'center',
          pt: { xs: 4, md: 8 },
          pb: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Powerful Features for
              <br />
              Modern Property Management
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 'md',
                mx: 'auto',
                mb: 5
              }}
            >
              Everything you need to efficiently manage and grow your property portfolio in one integrated platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleDemoRequest}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '50px'
              }}
            >
              Request a Demo
            </Button>
          </motion.div>

          {/* Dashboard Preview */}
          <Box sx={{ mt: 8, position: 'relative' }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card
                elevation={8}
                sx={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transform: 'perspective(1000px) rotateX(5deg)',
                  transformOrigin: 'bottom',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateX(0deg)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '500px' }
                  }}
                >
                  <Image
                    src="/images/dashboard-preview.png"
                    alt="HDS Platform Dashboard"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
              </Card>
            </motion.div>
          </Box>
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
          <Typography variant="h2" align="center" sx={{ mb: 8 }}>
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

      {/* Advanced Features */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 8 }}>
            Advanced Capabilities
          </Typography>
          <Grid container spacing={6}>
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Grid item xs={12} md={4} key={index}>
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
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`
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
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {feature.description}
                        </Typography>
                        <Stack spacing={2}>
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <Box
                              key={benefitIndex}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                              }}
                            >
                              <AutoAwesomeIcon color="primary" sx={{ fontSize: 20 }} />
                              <Typography variant="body2">{benefit}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      {/* Integrations Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.paper'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Typography variant="h2" gutterBottom>
                  Seamless Integrations
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Connect with your favorite tools and services to create a comprehensive property management ecosystem.
                </Typography>
                <Grid container spacing={3}>
                  {integrations.map((integration, index) => (
                    <Grid item xs={12} key={index}>
                      <Card
                        elevation={0}
                        sx={{
                          bgcolor: 'transparent',
                          border: `1px solid ${theme.palette.divider}`
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            {integration.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {integration.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '500px',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <Image src="/images/integrations.png" alt="Platform Integrations" fill style={{ objectFit: 'cover' }} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of property managers who trust HDS Platform to run their business.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleDemoRequest}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                borderRadius: '50px'
              }}
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </Container>
      </Box>
    </PublicLayout>
  )
}
