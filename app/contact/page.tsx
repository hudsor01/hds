'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  MenuItem,
  Alert,
  CircularProgress,
  alpha
} from '@mui/material'
import { Grid2 as Grid } from '@mui/material'
import { Mail, Phone, MapPin, MessageCircle, Clock, Users } from 'react-feather'
import { PublicLayout } from '@/components/public-layout'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, 'Minimum 2 characters').max(50),
  lastName: z.string().min(2, 'Minimum 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  topic: z.enum(['demo', 'pricing', 'support']),
  message: z.string().min(10, 'Minimum 10 characters').max(500)
})

type FormValues = z.infer<typeof formSchema>

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ContactPage(): React.ReactElement {
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      topic: 'demo',
      message: ''
    }
  })

  const onSubmit = async (/*data: FormValues*/) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We will respond within 24 hours.')
      reset()
    } catch {
      toast.error('Failed to send message. Please try again later.')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'support@hdsplatform.com',
      detail: 'We aim to respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '+1 (555) 123-4567',
      detail: 'Monday to Friday, 9am - 6pm PST'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      detail: 'Available 24/7 for quick questions'
    }
  ]

  const supportFeatures = [
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Always here when you need us'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Personal account management'
    },
    {
      icon: MapPin,
      title: 'Global Presence',
      description: 'Supporting clients worldwide'
    }
  ]

  return (
    <PublicLayout
      title="Contact HDS Platform - Get in Touch"
      description="Have questions about HDS Platform? Get in touch with our team for support, demos, or general inquiries."
    >
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8, py: 8 }}>
        <motion.div {...fadeIn}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Let&apos;s Connect
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 'md',
              mx: 'auto',
              mb: 5,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Have questions about our platform? We would love to hear from you. Get in touch and let us know how we can help.
          </Typography>
        </motion.div>
      </Box>

      {/* Contact Methods */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: theme.palette.background.paper,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '12px',
                        background: alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      <info.icon size={24} aria-hidden="true" />
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography variant="body1" color="primary" gutterBottom>
                      {info.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.detail}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card
              elevation={0}
              sx={{
                background: 'background.default',
                borderRadius: 4,
                boxShadow: 3
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                <Typography variant="h3" align="center" gutterBottom>
                  Send us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                  We typically respond within 1 business day
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email *"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="topic"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="How can we help? *"
                            variant="outlined"
                            fullWidth
                            error={!!errors.topic}
                            helperText={errors.topic?.message}
                          >
                            <MenuItem value="demo">Request a Demo</MenuItem>
                            <MenuItem value="pricing">Pricing Information</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Message *"
                            variant="outlined"
                            multiline
                            rows={5}
                            fullWidth
                            error={!!errors.message}
                            helperText={errors.message?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          height: 56,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          letterSpacing: 0.5
                        }}
                      >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                      </Button>
                    </Grid>

                    {Object.keys(errors).length > 0 && (
                      <Grid item xs={12}>
                        <Alert severity="error">Please fix the errors in the form before submitting</Alert>
                      </Grid>
                    )}
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Support Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container direction="row" spacing={4}>
          {supportFeatures.map((feature, index) => (
            <Grid key={index} item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  component="section"
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    transition: (theme: any) => theme.transitions.create('all'),
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 2
                    },
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      flexShrink: 0
                    }}
                  >
                    <feature.icon size={24} aria-hidden="true" />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  )
}
