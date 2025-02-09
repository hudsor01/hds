'use client'

import { type Milestone, type TeamMember, type Value } from '@/types/about'
import { Apartment, Lightbulb, People, Security, Timeline, TouchApp } from '@mui/icons-material'
import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import Link from 'next/link'
import { routes } from './routes'
import { FadeIn } from '@/components/animations/fade-in'
import { File as FileIcon, Trash2, Upload } from 'react-feather'

// Enhanced values with more property management specific content
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
]

// Enhanced team with more detailed bios and achievements
const team: TeamMember[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former VP of Operations at Leading Property Management Firms. Led digital transformation projects for 10,000+ units.',
    image: '/team/sarah-johnson.jpg',
    linkedin: 'https://linkedin.com/in/sarah-johnson',
    achievements: ['Forbes 30 Under 30', 'Property Management Innovation Award 2023'],
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Ex-Google Tech Lead. Specialized in scalable cloud architecture and AI-driven property management solutions.',
    image: '/team/michael-chen.jpg',
    linkedin: 'https://linkedin.com/in/michael-chen',
    achievements: ['Patent holder for AI-based maintenance prediction', '20+ years in PropTech'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Customer Success',
    bio: 'Certified Property Manager (CPM) with expertise in scaling customer operations from 100 to 10,000+ properties.',
    image: '/team/emily-rodriguez.jpg',
    linkedin: 'https://linkedin.com/in/emily-rodriguez',
    achievements: ['IREM Leadership Award', 'Customer Success Leader of the Year'],
  },
]

// Enhanced milestones with more specific achievements
const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Launched with seed funding from leading PropTech investors',
    icon: Apartment,
    metric: 'Initial 50 properties onboarded',
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description: 'Expanded nationwide with 500% year-over-year growth',
    icon: Timeline,
    metric: '10,000+ units under management',
  },
  {
    year: '2022',
    title: 'Platform Evolution',
    description: 'Introduced AI-powered maintenance prediction and tenant screening',
    icon: Lightbulb,
    metric: '99.9% uptime achieved',
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Named "Best Property Management Solution" by Real Estate Tech Awards',
    icon: People,
    metric: '50,000+ units managed',
  },
]

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
        {values.map((value) => (
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
  )
}
