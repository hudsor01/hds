'use client'

import { Card } from '@/components/ui/cards/card'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Mail, MapPin, Phone } from 'react-feather'
import { toast } from 'sonner'

const contactInfo = [
  {
    title: 'Email',
    value: 'info@hudsondigitalsolutions.com',
    icon: Mail
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    icon: Phone
  },
  {
    title: 'Address',
    value: '123 Business Street, Suite 100, New York, NY 10001',
    icon: MapPin
  }
]

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      toast.success('Message sent successfully!')
      setFormData(initialFormData)
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Box className="from-background to-muted/20 min-h-screen bg-gradient-to-b py-20">
      <Container maxWidth="lg">
        <Box className="mb-16 text-center">
          <Typography variant="h2" className="mb-4 font-bold">
            Contact Us
          </Typography>
          <Typography variant="h5" color="text.secondary" className="mx-auto max-w-3xl">
            Get in touch with our team to learn more about how we can help you manage your
            properties
          </Typography>
        </Box>

        <Grid container spacing={4} className="mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <Grid item xs={12} md={4} key={info.title}>
                <Card className="h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <Box className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full p-3">
                      <Icon className="text-primary h-6 w-6" />
                    </div>
                    <Typography variant="h6" className="mb-2 font-semibold">
                      {info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.value}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        <Card className="mx-auto max-w-2xl p-8">
          <Box component="form" onSubmit={handleSubmit} className="space-y-6">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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
                />
              </Grid>
            </Grid>

            <Box className="flex justify-end">
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

        <Card className="mt-16 w-full p-6">
          <Box className="relative aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1832416846336!2d-73.98784532342246!3d40.75479597138413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca05ca48ab0c3a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1709701234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </Box>
        </Card>
      </Container>
    </Box>
  )
}
