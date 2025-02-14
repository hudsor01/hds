'use client'

import { useState } from 'react'
import { PageTransition } from '@/components/layout/page-transition'
import { PublicLayout } from '@/components/layout/public-layout'
import {
  Container,
  Section,
  PageHeader,
  PageTitle,
  PageDescription
} from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send } from 'react-feather'
import { Email } from '@mui/icons-material'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'info@hudsondigitalsolutions.com',
    href: 'mailto:info@hudsondigitalsolutions.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    title: 'Location',
    details: 'New York, NY',
    href: '#'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [formData.email],
        subject: formData.subject,
        react: (
          <div>
            <p>{formData.message}</p>
          </div>
        )
      })

      if (error) {
        console.error('Error sending email:', error)
        setIsSuccess(false)
      } else {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSuccess(false)
    }

    setIsSubmitting(false)
  }

  return (
    <PublicLayout>
      <PageTransition>
        <Section>
          <Container>
            <PageHeader>
              <PageTitle>Get in Touch</PageTitle>
              <PageDescription>
                Have questions? We'd love to hear from you. Send us a message and we'll respond as
                soon as possible.
              </PageDescription>
            </PageHeader>

            <div className="grid gap-12 lg:grid-cols-3">
              <Card variant="default" className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label="Name"
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                  </div>

                  <div className="mt-6">
                    <Input
                      label="Subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="input"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                  </div>

                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || isSuccess}
                      loading={isSubmitting}
                    >
                      {isSuccess ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Message Sent!
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Send Message
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={info.title}
                    variant="interactive"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <a href={info.href} className="flex items-start gap-4 p-6">
                      <div className="bg-opacity-10 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                        <info.icon className="h-5 w-5 text-[var(--primary-color)]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{info.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{info.details}</p>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </PageTransition>
    </PublicLayout>
  )
}
