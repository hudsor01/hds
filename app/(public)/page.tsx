'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
  Grid,
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Apartment as ApartmentIcon,
  TrendingUp as TrendingUpIcon,
  SupportAgent as SupportIcon,
  Speed as SpeedIcon,
  DeviceHub as IntegrationIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <ApartmentIcon />,
    title: 'Property Management',
    description: 'Efficiently manage your properties, units, and tenants all in one place.',
    color: '#2563EB'
  },
  {
    icon: <SecurityIcon />,
    title: 'Enterprise Security',
    description: 'Bank-level security with end-to-end encryption, two-factor authentication, and automated backups.',
    color: '#7C3AED'
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Advanced Analytics',
    description: 'Make data-driven decisions with real-time insights, custom reports, and predictive analytics.',
    color: '#059669'
  },
  {
    icon: <SupportIcon />,
    title: '24/7 Support',
    description: 'Dedicated support team ready to assist you around the clock for any questions or issues.',
    color: '#DC2626'
  },
  {
    icon: <SpeedIcon />,
    title: 'High Performance',
    description: 'Lightning-fast performance optimized for managing large property portfolios efficiently.',
    color: '#0891B2'
  },
  {
    icon: <IntegrationIcon />,
    title: 'Smart Integrations',
    description: 'Seamlessly integrate with your existing tools and workflows for maximum productivity.',
    color: '#C026D3'
  }
];

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          pt: { xs: 12, md: 16 },
          pb: { xs: 16, md: 20 }
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark}),
                        linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark})`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ maxWidth: 600 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 3,
                      lineHeight: 1.2
                    }}
                  >
                    Transform Your
                    <Box component="span" sx={{ color: '#60A5FA' }}> Property </Box>
                    Management
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      lineHeight: 1.6,
                      maxWidth: 600
                    }}
                  >
                    Streamline operations, boost efficiency, and enhance tenant satisfaction with our comprehensive solution.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router.push('/auth/sign-up')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.common.white, 0.9)
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/demo')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: alpha(theme.palette.common.white, 0.1)
                        }
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                  }}
                >
                  <HomeIcon
                    sx={{
                      fontSize: { xs: 200, md: 300 },
                      opacity: 0.9,
                      filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.2))',
                      color: 'white'
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 800,
              mb: { xs: 6, md: 8 },
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Powerful Features for Modern
            <Box component="span" sx={{ color: 'primary.main' }}> Property Management</Box>
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5
                      }
                    }
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 4,
                      bgcolor: alpha(feature.color, 0.03),
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        bgcolor: alpha(feature.color, 0.05),
                        '& .feature-icon': {
                          transform: 'scale(1.1)',
                          color: feature.color
                        }
                      }
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: alpha(feature.color, 0.1),
                        color: feature.color,
                        transition: 'all 0.3s ease-in-out',
                        '& > svg': {
                          fontSize: 40
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          mt: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern - reusing the same pattern for consistency */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark}),
                        linear-gradient(45deg, ${theme.palette.primary.dark} 25%, transparent 25%, transparent 75%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.dark})`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />

        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Ready to Transform Your Property Management?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Join thousands of property managers who are already streamlining their operations with our platform.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/auth/sign-up')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.9)
                  }
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Start Your Free Trial
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
