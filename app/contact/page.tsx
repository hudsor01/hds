'use client'

import { Box, Card, Container, Grid, TextField, Typography, useTheme } from '@mui/material'
import { Mail, MapPin, Phone } from 'react-feather'
import { useState } from 'react'
import { toast } from 'sonner'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const contactInfo = [
  {
    title: 'Email',
    value: 'info@hudsondigitalsolutions.com',
    icon: Mail,
    href: 'mailto:info@hudsondigitalsolutions.com'
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    icon: Phone,
    href: 'tel:+15551234567'
  },
  {
    title: 'Address',
    value: '123 Business Street, Suite 100, New York, NY 10001',
    icon: MapPin,
    href: 'https://maps.google.com/?q=123+Business+Street,+Suite+100,+New+York,+NY+10001'
  }
] as const

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
}

export default function ContactPage() {
  const theme = useTheme()
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      toast.success('Message sent successfully!')
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Box
      sx={{
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)'
            : 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        minHeight: 'calc(100vh - 64px)',
        py: 10
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '3xl', mx: 'auto' }}>
            Get in touch with our team to learn more about how we can help you manage your
            properties
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map(info => (
            <Grid item xs={12} md={4} key={info.title}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.palette.primary.main + '1a'
                    }}
                  >
                    <info.icon className="text-primary" size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {info.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="a"
                    href={info.href}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {info.value}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ maxWidth: 'md', mx: 'auto', p: 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  fullWidth
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  minWidth: 200,
                  height: 48,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Send Message
              </LoadingButton>
            </Box>
          </Box>
        </Card>

        <Card sx={{ mt: 8, width: '100%', p: 3 }}>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1832416846336!2d-73.98784532342246!3d40.75479597138413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca05ca48ab0c3a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1709701234567!5m2!1sen!2sus"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Card>
      </Container>
    </Box>
  )
}
