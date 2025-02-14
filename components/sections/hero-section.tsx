'use client'

import { HeroContent } from './hero-content'
import ClientOnly from '@/components/utils/client-only'

export function HeroSection() {
  return (
    <ClientOnly>
      <HeroContent />
    </ClientOnly>
  )
}
