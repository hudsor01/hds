'use client'

import { React, Suspense } from 'react'
import { Features } from '@/components/features/feature-grid'
import { LoadingSpinner } from '@/components/loading/loading-state'

export default async function HomePage() {
  return (
    <main className="flex-1">
      <Hero />

      <Suspense
        fallback={
          <div className="flex-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        }
      >
        <Features />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex-center min-h-[600px]">
            <LoadingSpinner />
          </div>
        }
      >
        <Pricing />
      </Suspense>

      <About />

      <Suspense
        fallback={
          <div className="flex-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        }
      >
        <Contact />
      </Suspense>

      <Newsletter />
    </main>
  )
}
