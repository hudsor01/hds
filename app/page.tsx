'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { routes } from '@/routes'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  {
    value: '24/7',
    label: 'Support Available',
    chart: false
  },
  {
    value: '100%',
    label: 'Cloud-Based Solution',
    chart: false
  },
  {
    value: 'Real-Time',
    label: 'Property Insights',
    chart: false
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

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <main className="space-y-24 bg-white">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#91C8FF_1px,transparent_1px),linear-gradient(to_bottom,#91C8FF_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pastel-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-lavender/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h1 className="font-display text-5xl md:text-6xl font-black text-gray-900">
                Property Management
                <span className="block mt-2 bg-linear-to-r from-pastel-blue-400 to-pastel-blue-200 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="font-body text-xl text-gray-600">
                Professional tools for modern property managers. Streamline your workflow and boost efficiency.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {session ? (
                  <Button
                    className="bg-pastel-blue-500 hover:bg-pastel-blue-600 text-white w-full sm:w-auto font-sans"
                    asChild
                  >
                    <Link href={routes.dashboard}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      className="bg-pastel-blue-500 hover:bg-pastel-blue-600 text-white w-full sm:w-auto font-sans"
                      asChild
                    >
                      <Link href={routes.auth.register}>Get Started Free</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-pastel-blue-300 text-pastel-blue-600 hover:bg-pastel-blue-50 w-full sm:w-auto font-sans"
                      asChild
                    >
                      <Link href={routes.auth.login}>Sign In</Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-pastel-blue-200"
            >
              <div className="absolute inset-0 bg-linear-to-br from-pastel-blue-100/20 to-pastel-blue-50/20" />
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Update remaining sections with pastel blue colors */}
      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "HDS transformed how we manage our properties. The efficiency gains are remarkable.",
              author: "Sarah Johnson",
              role: "Property Manager",
              company: "Urban Living Properties"
            },
            {
              quote: "The best property management software we've used. Intuitive and powerful.",
              author: "Michael Chen",
              role: "CEO",
              company: "Pacific Real Estate Group"
            }
          ].map((testimonial, i) => (
            <Card key={i} className="p-6 bg-linear-to-br from-teal-soft/5 to-lavender/5 hover:from-teal-soft/10 hover:to-lavender/10 transition-colors border-pastel-blue-200/20">
              <div className="flex flex-col gap-4">
                <div className="text-teal-soft font-bold">
                  {"★".repeat(5)}
                </div>
                <p className="font-display text-lg italic">{testimonial.quote}</p>
                <div>
                  <div className="font-sans font-semibold">{testimonial.author}</div>
                  <div className="font-body text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-pastel-blue-200/20">
              <div className="text-3xl font-bold text-pastel-blue-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4 font-body">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-linear-to-r from-pastel-blue-300 to-pastel-blue-100 text-gray-800"
      >
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {session ? 'Ready to Manage Your Properties?' : 'Start Your Free Trial Today'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {session
              ? 'Access your dashboard to get started'
              : 'No credit card required • 14-day free trial • Full access'}
          </p>
          {session ? (
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
              asChild
            >
              <Link href={routes.dashboard}>Go to Dashboard</Link>
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                asChild
              >
                <Link href={routes.auth.register}>Start Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                asChild
              >
                <Link href={routes.auth.login}>Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.section>
    </main>
  )
}
