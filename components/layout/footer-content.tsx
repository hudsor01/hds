'use client'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { GitHub, Twitter } from 'react-feather'
import { showToast } from '@/components/ui/toast'

export function FooterContent() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast({
        title: 'Success',
        message: 'Successfully subscribed to newsletter!',
        type: 'success'
      })
      setEmail('')
    } catch (error) {
      showToast({
        title: 'Error',
        message: 'Failed to subscribe. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-border-ui bg-background-ui mt-auto border-t">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-text-primary text-lg font-semibold">Stay Updated</h2>
            <p className="text-text-secondary mt-2 text-sm">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex max-w-md gap-x-2">
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
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>

          <nav className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="text-text-primary text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-3">
                {[
                  ['Features', '/features'],
                  ['Pricing', '/pricing'],
                  ['About', '/about']
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-text-primary text-sm font-semibold">Support</h3>
              <ul className="mt-4 space-y-3">
                {[
                  ['Contact', '/contact'],
                  ['Documentation', '/docs'],
                  ['API', '/api']
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-text-primary text-sm font-semibold">Connect</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://twitter.com/hudsondigital"
                    className="text-text-secondary hover:text-primary inline-flex items-center gap-x-2 text-sm transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/hudsondigital"
                    className="text-text-secondary hover:text-primary inline-flex items-center gap-x-2 text-sm transition-colors"
                  >
                    <GitHub className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="border-border-ui mt-12 border-t pt-8">
          <p className="text-text-tertiary text-center text-sm">
            © {new Date().getFullYear()} Hudson Digital Solutions. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
