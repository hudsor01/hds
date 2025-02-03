import {Box, Container, Grid, Typography, useTheme} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import {motion} from 'framer-motion';
import React from 'react';
import {BarChart, Clock, Home, Shield, Users, Zap} from 'react-feather';

const features = [
  {
    icon: <Home size={40} />,
    title: 'Unified Property Dashboard',
    description: 'Manage all properties from a single interface with real-time updates',
  },
  {
    icon: <Zap size={40} />,
    title: 'Automated Workflows',
    description: 'Streamline maintenance requests, rent collection, and tenant communication',
  },
  {
    icon: <Shield size={40} />,
    title: 'Bank-Grade Security',
    description: 'SOC 2 compliant infrastructure with end-to-end encryption',
  },
  {
    icon: <BarChart size={40} />,
    title: 'Advanced Analytics',
    description: 'Real-time performance metrics and predictive insights',
  },
  {
    icon: <Clock size={40} />,
    title: '24/7 Monitoring',
    description: 'AI-powered anomaly detection and alerts',
  },
  {
    icon: <Users size={40} />,
    title: 'Tenant Portal',
    description: 'Self-service portal for payments and maintenance requests',
  },
];

export default function FeatureGrid() {
  const theme = useTheme();

  return (
    <Box sx={{py: 10, bgcolor: 'background.default'}}>
      <Container maxWidth='lg'>
        <Typography variant='h3' align='center' gutterBottom sx={{fontWeight: 700, mb: 8}}>
          Enterprise-Grade Features
        </Typography>
        <Grid2 container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{y: -5}} transition={{type: 'spring', stiffness: 300}}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: `1px solid ${theme.palette.divider}`,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      color: 'primary.main',
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: 3,
                      bgcolor: 'primary.light',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant='h5' gutterBottom sx={{fontWeight: 600}}>
                    {feature.title}
                  </Typography>
                  <Typography color='text.secondary'>{feature.description}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
