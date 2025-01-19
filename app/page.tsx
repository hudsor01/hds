'use client'

import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Settings, Shield, Users } from 'react-feather'

const COLORS = {
  primary: '#60A5FA',
  primaryLight: '#E3F0FF',
  primaryDark: '#3B82F6',
  text: '#1A202C',
  textLight: '#4A5568',
  background: '#FFFFFF',
  backgroundDark: '#F7FAFC',
  border: 'rgba(0,0,0,0.08)'
}

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.98 }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: i * 0.1
    }
  }),
  hover: {
    y: -12,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
}

export default function Home() {
  const theme = useTheme()

  return (
    <Box sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 20 }, pb: { xs: 8, md: 12 } }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Stack spacing={6} alignItems="center" textAlign="center">
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.textLight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  '& .highlight': {
                    color: COLORS.primary,
                    WebkitTextFillColor: COLORS.primary,
                  }
                }}
              >
                <span className="highlight">Simplify</span>
                {' '}Property Management
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  maxWidth: '800px',
                  color: COLORS.textLight,
                  lineHeight: 1.8,
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  fontWeight: 400
                }}
              >
                Streamline your property management with our comprehensive platform. From rent collection to maintenance requests, we've got you covered.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                sx={{ mt: 2 }}
              >
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    component={Link}
                    href="/signup"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowRight size={20} />}
                    sx={{
                      bgcolor: COLORS.primary,
                      color: 'white',
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '12px',
                      boxShadow: `0 8px 20px -4px ${COLORS.primary}40`,
                      '&:hover': {
                        bgcolor: COLORS.primaryDark,
                        boxShadow: `0 12px 24px -4px ${COLORS.primary}60`,
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    component={Link}
                    href="/features"
                    variant="outlined"
                    size="large"
                    sx={{
                      color: COLORS.text,
                      borderColor: COLORS.border,
                      borderWidth: 2,
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      borderRadius: '12px',
                      '&:hover': {
                        bgcolor: COLORS.primaryLight,
                        borderColor: COLORS.primary,
                        borderWidth: 2
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          bgcolor: COLORS.backgroundDark,
          py: { xs: 12, md: 20 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: `linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.backgroundDark} 100%)`,
          }
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center" mb={12}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 700,
                    mb: 2,
                    background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.textLight} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    '& .highlight': {
                      color: COLORS.primary,
                      WebkitTextFillColor: COLORS.primary,
                    }
                  }}
                >
                  Powerful <span className="highlight">Features</span>
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: COLORS.textLight,
                    fontSize: '1.2rem',
                    maxWidth: '700px',
                    lineHeight: 1.8,
                    fontWeight: 400
                  }}
                >
                  Everything you need to manage your properties efficiently
                </Typography>
              </motion.div>
            </Stack>

            <Grid container spacing={4}>
              {[
                {
                  icon: <Settings size={28} />,
                  title: 'Smart Property Management',
                  description: 'Streamline your property operations with our intelligent management tools and automated workflows.'
                },
                {
                  icon: <Shield size={28} />,
                  title: 'Secure Data Handling',
                  description: 'Your data is protected with enterprise-grade security and regular backups.'
                },
                {
                  icon: <Users size={28} />,
                  title: 'Multi-tenant Support',
                  description: 'Manage multiple properties and tenants from a single, unified dashboard.'
                }
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    custom={index}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Card
                      sx={{
                        height: '100%',
                        bgcolor: 'background.paper',
                        border: `2px solid ${COLORS.border}`,
                        borderRadius: 3,
                        boxShadow: 'none',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        '&:hover': {
                          borderColor: COLORS.primary,
                          boxShadow: `0 16px 32px -4px ${COLORS.border}`,
                          '& .icon-box': {
                            transform: 'scale(1.1)',
                            bgcolor: COLORS.primary,
                            color: 'white'
                          }
                        }
                      }}
                    >
                      <CardContent sx={{ p: 5, textAlign: 'center' }}>
                        <Box
                          className="icon-box"
                          sx={{
                            mb: 4,
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: COLORS.primaryLight,
                            color: COLORS.primary,
                            margin: '0 auto',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: COLORS.text,
                            mb: 2
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: COLORS.textLight,
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  )
}
