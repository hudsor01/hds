'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-provider'
import { useEffect } from 'react'
import { Button } from '@/components/button'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <main>
      <HeroSection />
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Ready to get started?</h2>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
