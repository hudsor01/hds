'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'react-feather'
import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]

export function NavbarContent() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="border-border-ui bg-background-ui/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold">HDS</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-primary' : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <m.div
                    layoutId="navbar-indicator"
                    className="bg-primary absolute inset-x-0 -bottom-[1px] h-0.5"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
            <Button asChild variant="primary" className="ml-4">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>

          <button
            type="button"
            className="flex items-center md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-text-primary h-6 w-6" />
            ) : (
              <Menu className="text-text-primary h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-border-ui bg-background-ui border-b md:hidden"
          >
            <Container className="space-y-4 py-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    pathname === link.href ? 'text-primary' : 'text-text-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="primary" className="mt-4 w-full">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
