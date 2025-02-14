'use client'

import { FooterContent } from './footer-content'
import ClientOnly from '@/components/utils/client-only'

export default function Footer() {
  return (
    <ClientOnly>
      <FooterContent />
    </ClientOnly>
  )
}
