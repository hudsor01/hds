import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Newsletter } from '@/components/newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <About />
      <Contact />
      <Newsletter />
    </>
  )
}
