'use client'

import { Groups, Lightbulb, Rocket, TrendingUp } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Container, Stack, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { motion } from 'framer-motion'
import type { JSX } from 'react'
import React from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
}

export default function AboutPage(): JSX.Element {
  const theme = useTheme()

  const showJoinTeamMessage = () => {
    toast.success('Thank you for your interest! Our HR team will be in touch.')
  }

  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Continuously pushing boundaries to deliver cutting-edge property management solutions.'
    },
    {
      icon: Groups,
      title: 'Customer Focus',
      description: 'Building features and improvements based on real user feedback and needs.'
    },
    {
      icon: Lightbulb,
      title: 'Simplicity',
      description: 'Making property management more accessible through intuitive design.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: `Supporting our customers' success and scaling their property portfolios.`
    }
  ]

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: '15+ years in PropTech'
    },
    {
      name: 'Maria Garcia',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Ex-Google Engineer'
    },
    {
      name: 'James Wilson',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      bio: 'Product Management Expert'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      bio: '10+ Years in Customer Support'
    }
  ]

  return (
    <PublicLayout
      title="About HDS Platform - Our Story and Team"
      description="Learn about our mission to revolutionize property management and meet the team behind HDS Platform."
    >
      {/* Hero Section */}
      <Box component="section" sx={{ textAlign: 'center', mb: 10 }}>
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
            Revolutionizing Property Management
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto', mb: 5 }}>
            We are building the future of property management software, making it easier for property owners to manage and grow
            their portfolios.
          </Typography>
        </motion.div>
      </Box>

      {/* Values Section */}
      <Box
        component="section"
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Grid xs={12} sm={6} md={3} key={index} component="div">
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
                        backgroundColor: 'transparent',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '12px',
                            backgroundColor: `${theme.palette.primary.main}15`,
                            color: 'primary.main',
                            mb: 2
                          }}
                        >
                          <Icon />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
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

      {/* Team Section */}
      <Box component="section" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 6 }}>
            Meet Our Team
          </Typography>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                      textAlign: 'center',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <CardContent>
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: 120,
                          height: 120,
                          mx: 'auto',
                          mb: 2,
                          border: `3px solid ${theme.palette.primary.main}`
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Join Us Section */}
      <Box
        component="section"
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.paper,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="h3" gutterBottom>
              Join Our Team
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We are always looking for talented individuals who share our passion for innovation in property management.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }} onClick={showJoinTeamMessage}>
              <motion.button
                className="btn-primary rounded-full px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Open Positions
              </motion.button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </PublicLayout>
  )
}
