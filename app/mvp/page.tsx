'use client'

import { WaitlistForm } from '@/components/forms/waitlist-form'
import { Card } from '@/components/ui/card'
import { ChartBarIcon, CogIcon, HomeIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: 'Smart Property Management',
    description: 'Streamline your property operations with our intelligent management system',
    icon: HomeIcon
  },
  {
    title: 'Automated Maintenance',
    description: 'Handle maintenance requests efficiently with automated workflows',
    icon: CogIcon
  },
  {
    title: 'Financial Tracking',
    description: 'Keep track of your property finances with detailed analytics',
    icon: ChartBarIcon
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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#A7C7E7_1px,transparent_1px),linear-gradient(to_bottom,#A7C7E7_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1]" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            >
              Transform Your
              <span className="block mt-2 bg-gradient-to-r from-[#A7C7E7] to-[#F0F8FF] bg-clip-text text-transparent">
                Property Management
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 font-body"
            >
              Join the waitlist for the most intelligent property management platform.
              Be the first to experience our revolutionary features.
            </motion.p>

            {/* Waitlist Form Component */}
            <motion.div
              variants={fadeInUp}
              className="mx-auto mt-10 max-w-xl"
            >
              <WaitlistForm />
            </motion.div>
          </div>

          {/* Preview Image */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-[#A7C7E7]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#A7C7E7]/20 to-[#F0F8FF]/20" />
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
      <section className="py-20 bg-[#F0F8FF]/30">
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
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-[#A7C7E7]/20">
                  <feature.icon className="w-12 h-12 text-[#A7C7E7] mb-4" />
                  <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
                  <p className="text-gray-600 font-body">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
