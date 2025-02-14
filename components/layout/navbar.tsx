'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'react-feather'
import { useState } from 'react'

const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-background-ui/80 fixed top-0 z-50 w-full backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold">HDS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link relative ${pathname === link.href ? 'text-primary' : ''}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                  />
                )}
              </Link>
            ))}
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-text-secondary h-6 w-6" />
            ) : (
              <Menu className="text-text-secondary h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className={`bg-background-ui overflow-hidden md:hidden ${isMobileMenuOpen ? 'border-b' : ''}`}
      >
        <div className="mx-auto space-y-4 px-4 py-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-lg ${
                pathname === link.href ? 'text-primary' : 'text-text-secondary'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-4 w-full">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </motion.div>
    </nav>
  )
}
