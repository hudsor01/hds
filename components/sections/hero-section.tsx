import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'react-feather'
import { Container, PageHeader, PageTitle, PageDescription } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function HeroSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  return (
    <section className="relative flex min-h-[85vh] items-center bg-gradient-to-br from-blue-500 via-white to-white">
      <div className="bg-grid-pattern absolute inset-0 opacity-10" />
      <Container>
        <PageHeader>
          <PageTitle className="text-4xl font-bold text-gray-900">
            Transform Your Property Management
          </PageTitle>
          <PageDescription className="text-lg text-gray-700">
            Join the waitlist for the next generation of property management software. Be the first
            to experience our innovative platform.
          </PageDescription>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSubmitting || isSuccess}
                className="pr-12"
              />
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                loading={isSubmitting}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {isSuccess ? (
                  "You're on the list!"
                ) : (
                  <div className="flex items-center gap-2">
                    Join Waitlist
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Join {Math.floor(Math.random() * 100 + 400)} others on the waitlist. No spam, ever.
            </p>
          </motion.div>
        </PageHeader>
      </Container>
    </section>
  )
}
