'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowRight } from 'react-feather'
import { Container, PageHeader, PageTitle, PageDescription } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { showToast } from '@/components/ui/toast'

const STATIC_COUNT = 476

export function HeroContent() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast({
        title: 'Success',
        message: 'Thank you for joining the waitlist!',
        type: 'success'
      })
      setEmail('')
    } catch (error) {
      showToast({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background-app relative flex min-h-[85vh] items-center">
      <div className="bg-grid-pattern absolute inset-0" />

      <Container>
        <PageHeader>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PageTitle>Transform Your Property Management</PageTitle>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PageDescription>
              Join the waitlist for the next generation of property management software. Be the
              first to experience our innovative platform.
            </PageDescription>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Card variant="outline" className="mx-auto max-w-md p-4">
              <form onSubmit={handleSubmit} className="flex gap-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                  <span>Join</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
              <p className="text-text-tertiary mt-3 text-center text-sm">
                Join {STATIC_COUNT} others on the waitlist. No spam, ever.
              </p>
            </Card>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { title: 'Smart Analytics', description: 'Make data-driven decisions' },
              { title: 'Easy Integration', description: 'Works with your tools' },
              { title: 'Real-time Updates', description: 'Stay informed instantly' }
            ].map((feature, index) => (
              <Card key={feature.title} className="p-6 text-center">
                <h3 className="text-text-primary text-lg font-semibold">{feature.title}</h3>
                <p className="text-text-secondary mt-2 text-sm">{feature.description}</p>
              </Card>
            ))}
          </m.div>
        </PageHeader>
      </Container>
    </section>
  )
}
