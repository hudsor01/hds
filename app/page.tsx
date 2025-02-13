'use client'

import { Suspense } from 'react'
import { Loading } from '@/components/loading/loading-state'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section
        id="hero"
        className="relative h-screen min-h-[600px] bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-bold text-white">Hudson Digital Solutions</h1>
            <p className="mb-8 text-xl text-gray-300">
              Your comprehensive property management solution
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Features</h2>
          <Suspense fallback={<Loading />}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature cards will be rendered here */}
            </div>
          </Suspense>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">About Us</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-gray-600">
              We provide innovative solutions for property management, making it easier for property
              managers and owners to streamline their operations.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Pricing Plans</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Pricing cards will be rendered here */}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Contact Us</h2>
          <div className="mx-auto max-w-xl">{/* Contact form will be rendered here */}</div>
        </div>
      </section>
    </main>
  )
}
