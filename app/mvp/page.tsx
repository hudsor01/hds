'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const features = [
  {
    title: 'Smart Property Management',
    description: 'Streamline your property operations with our intelligent management system',
    icon: '🏢'
  },
  {
    title: 'Automated Maintenance',
    description: 'Handle maintenance requests efficiently with automated workflows',
    icon: '🔧'
  },
  {
    title: 'Financial Tracking',
    description: 'Keep track of your property finances with detailed analytics',
    icon: '📊'
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function MVPLandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email collection logic
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            >
              Transform Your
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Property Management
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-xl text-gray-600"
            >
              Join the waitlist for the most intelligent property management platform.
              Be the first to experience our revolutionary features.
            </motion.p>

            {/* Email Collection Form */}
            <motion.div
              variants={fadeInUp}
              className="mx-auto mt-10 max-w-xl"
            >
              <form onSubmit={handleSubmit} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Join Waitlist
                </Button>
              </form>
              {isSubmitted && (
                <p className="mt-4 text-green-600">Thank you for joining our waitlist!</p>
              )}
            </motion.div>
          </div>

          {/* Preview Image */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-blue-100"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
            <Image
              src="/dashboard-preview.png"
              alt="Platform Preview"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                custom={index}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Trusted by Property Managers</h2>
            <div className="flex justify-center items-center gap-12 opacity-60">
              {/* Add partner/client logos here */}
              <div className="text-4xl font-bold text-gray-400">500+</div>
              <div className="text-xl text-gray-600">Properties Managed</div>
              <div className="text-4xl font-bold text-gray-400">98%</div>
              <div className="text-xl text-gray-600">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property Management?</h2>
            <p className="text-xl mb-8 text-blue-100">Join our waitlist today and be the first to experience the future of property management.</p>
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button type="submit" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                Join Waitlist
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
