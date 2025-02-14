'use client'

import { FooterContent } from './footer-content'
import ClientOnly from '@/components/utils/client-only'
import Link from 'next/link'

export default function Footer() {
  return (
    <ClientOnly>
      <FooterContent />
      <div className="flex justify-center space-x-4 mt-4">
        <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">
          Features
        </Link>
        <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
          About
        </Link>
        <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
          Contact
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          Home
        </Link>
      </div>
    </ClientOnly>
  )
}
