'use client';

import { type Value } from '@/types/about';
import { Lightbulb, Security, TouchApp } from '@mui/icons-material';
import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import { routes } from './routes';
import { FadeIn } from '@/components/animations/fade-in';

const values: Value[] = [
  {
    title: 'Innovation',
    description: 'Pioneering smart solutions in property management with AI and automation',
    icon: Lightbulb,
    color: 'text-amber-500',
  },
  {
    title: 'Security',
    description: 'Enterprise-grade protection for your property data and tenant information',
    icon: Security,
    color: 'text-blue-500',
  },
  {
    title: 'User Experience',
    description: 'Intuitive interfaces for property managers, owners, and tenants',
    icon: TouchApp,
    color: 'text-green-500',
  },
];

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 8,
        }}
      >
        <FadeIn delay={0.2}>
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Property Management
            <br />
            Made Simple
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography
            variant="h2"
            align="center"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: 'md',
              mb: 6,
            }}
          >
            Streamline your property management with our comprehensive solution. From tenant
            screening to maintenance tracking, we've got you covered.
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Link href={routes.auth.signIn} passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href={routes.features} passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#007FFF',
                    color: '#007FFF',
                    '&:hover': {
                      borderColor: '#0059B2',
                      color: '#0059B2',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Link>
            </Grid>
          </Grid>
        </FadeIn>
      </Box>

      <Grid container spacing={4} sx={{ mt: 8 }}>
        {values.map(value => (
          <Grid item xs={12} md={4} key={value.title}>
            <FadeIn>
              <value.icon className={`h-8 w-8 ${value.color}`} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {value.title}
              </Typography>
              <Typography color="text.secondary">{value.description}</Typography>
            </FadeIn>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
