'use client'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { GitHub, Twitter } from 'react-feather'

export default function Footer() {
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
    <footer className="mt-auto border-t border-border-ui bg-background-ui">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Stay Updated</h2>
              <p className="mt-4 text-text-secondary">
                Join our newsletter to stay up to date on features and releases.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting || isSuccess}
                />
                <Button type="submit" disabled={isSubmitting || isSuccess}>
                  {isSuccess ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
              <p className="mt-4 text-sm text-text-tertiary">
                Join 476 others on the waitlist. No spam, ever.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-text-primary">Product</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    ['Features', '/features'],
                    ['Pricing', '/pricing'],
                    ['About', '/about']
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-text-secondary hover:text-primary">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Connect</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="https://twitter.com/hudsondigital"
                      className="flex items-center text-text-secondary hover:text-primary"
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/hudsondigital"
                      className="flex items-center text-text-secondary hover:text-primary"
                    >
                      <GitHub className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-border-ui pt-8">
            <p className="text-center text-sm text-text-tertiary">
              © {new Date().getFullYear()} Hudson Digital Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
