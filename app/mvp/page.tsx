'use client'

import { WaitlistForm } from '@/components/features/marketing/waitlist-form'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import BuildIcon from '@mui/icons-material/Build'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import StorefrontIcon from '@mui/icons-material/Storefront'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { Card } from '@/components/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Animation variants
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

// Features data
const features = [
  {
    icon: <BusinessIcon className="h-6 w-6" />,
    title: 'Property Owners',
    description: 'Streamline your property portfolio management with powerful analytics and automated workflows.'
  },
  {
    icon: <StorefrontIcon className="h-6 w-6" />,
    title: 'Property Managers',
    description: 'Manage multiple properties effortlessly with our comprehensive management suite.'
  },
  {
    icon: <VpnKeyIcon className="h-6 w-6" />,
    title: 'Tenants',
    description: 'Easy rent payments, maintenance requests, and communication with property managers.'
  },
  {
    icon: <AssignmentTurnedInIcon className="h-6 w-6" />,
    title: 'Applicants',
    description: 'Streamlined application process with real-time status updates and document management.'
  },
  {
    icon: <BuildIcon className="h-6 w-6" />,
    title: 'Vendors',
    description: 'Simplified job assignments, scheduling, and payment processing for maintenance work.'
  },
  {
    icon: <PeopleIcon className="h-6 w-6" />,
    title: 'Real Estate Agents',
    description: 'Seamless property listings, tenant matching, and commission tracking.'
  }
]

export default function MVPLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F0F8FF]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#A7C7E7_1px,transparent_1px),linear-gradient(to_bottom,#A7C7E7_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1]" />

        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 h-72 w-72 rounded-full bg-[#A7C7E7]/20 blur-3xl" />
          <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-[#A7C7E7]/20 blur-3xl" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Hero Content */}
          <div className="text-center">
            <motion.div variants={fadeInUp} className="mb-8 inline-block rounded-full bg-[#A7C7E7]/10 px-4 py-1.5">
              <span className="text-sm font-medium text-[#A7C7E7]">Early Access Available</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-roboto text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            >
              The Future of
              <span className="mt-2 block bg-gradient-to-r from-[#A7C7E7] to-[#C6E2FF] bg-clip-text text-transparent">
                Property Management
              </span>
            </motion.h1>

            {/* Stats Section */}
            <motion.div variants={fadeInUp} className="mt-8 flex justify-center gap-8">
              {[
                ['Properties Managed', '1000+'],
                ['Customer Satisfaction', '98%'],
                ['Time Saved', '40%']
              ].map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-[#A7C7E7]">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Waitlist Section */}
            <motion.div variants={fadeInUp} className="mx-auto mt-12 max-w-xl">
              <WaitlistForm />
            </motion.div>
          </div>

          {/* Preview Image */}
          <motion.div
            variants={fadeInUp}
            className="relative mt-16 overflow-hidden rounded-2xl border border-[#A7C7E7]/20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#A7C7E7]/10 to-transparent" />
            <Image
              src="/dashboard-preview.png"
              alt="Platform Preview"
              width={1200}
              height={800}
              className="h-auto w-full"
              priority
            />
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={fadeInUp} className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <Card
                key={feature.title}
                className="group p-6 transition-all duration-200 hover:border-[#A7C7E7]/50 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-[#A7C7E7]/10 p-2 transition-colors group-hover:bg-[#A7C7E7]/20">
                    {feature.icon}
                  </div>
                  <h3 className="font-roboto font-medium text-gray-900">{feature.title}</h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
