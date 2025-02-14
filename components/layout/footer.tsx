'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GitHub, Mail, Twitter } from 'react-feather'

const footerLinks = {
  product: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ],
  company: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/security', label: 'Security' },
    { href: '/status', label: 'Status' }
  ],
  social: [
    { href: 'mailto:info@hudsondigitalsolutions.com', label: 'Email', icon: Mail },
    { href: 'https://twitter.com/hudsondigital', label: 'Twitter', icon: Twitter },
    { href: 'https://github.com/hudson-digital', label: 'GitHub', icon: GitHub }
  ]
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-[var(--primary-color)]">
              HDS
            </Link>
            <p className="text-sm text-gray-500">
              Transforming property management with innovative digital solutions.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 transition-colors hover:text-[var(--primary-color)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[var(--primary-color)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[var(--primary-color)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Stay Updated</h3>
            <p className="mt-4 text-sm text-gray-500">
              Subscribe to our newsletter for product updates and industry insights.
            </p>
            <form className="mt-4">
              <div className="flex max-w-md gap-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input flex-1 text-sm"
                  required
                />
                <button type="submit" className="button-primary text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Hudson Digital Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
