'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { routes } from '@/routes'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 600 },
  { month: 'Apr', value: 800 },
  { month: 'May', value: 700 },
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
    <main className="space-y-24 bg-background text-foreground">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h1 className="font-display text-5xl md:text-6xl font-black text-foreground">
                Property Management
                <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="font-body text-xl text-muted-foreground">
                Professional tools for modern property managers. Streamline your workflow and boost efficiency.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {session ? (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto font-sans"
                    asChild
                  >
                    <Link href={routes.dashboard}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto font-sans"
                      asChild
                    >
                      <Link href={routes.auth.register}>Get Started Free</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-accent text-accent-foreground hover:bg-accent/10 w-full sm:w-auto font-sans"
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
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-border"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
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
            <Card key={i} className="p-6 bg-gradient-to-br from-teal-soft/5 to-lavender/5 hover:from-teal-soft/10 hover:to-lavender/10 transition-colors border-lavender/20">
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

      {/* Remove duplicate motion.div and motion.section here */}

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { value: '500+', label: 'Properties Managed', chart: true },
            { value: '98%', label: 'Client Satisfaction', chart: false },
            { value: '24/7', label: 'Support Available', chart: false }
          ].map((stat, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-lavender/20">
              <div className="text-3xl font-bold text-teal-soft mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4 font-body">
                {stat.label}
              </div>
              {stat.chart && (
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A7E7D9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C7A7E7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#A7E7D9"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="max-w-7xl mx-auto px-4"
      >
        <motion.h2
          variants={fadeInUp}
          className="font-display text-3xl font-bold text-center mb-12"
        >
          Comprehensive Management Tools
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Property Analytics',
              desc: 'Real-time financial tracking and occupancy insights',
              gradient: 'from-teal-soft to-teal-soft/70',
              titleFont: 'font-sans', // Roboto - Primary
            },
            {
              title: 'Tenant Portal',
              desc: 'Digital communication & payment infrastructure',
              gradient: 'from-lavender to-lavender/70',
              titleFont: 'font-display', // Playfair Display - Secondary
            },
            {
              title: 'Maintenance OS',
              desc: 'Workflow automation & progress tracking',
              gradient: 'from-teal-soft/70 to-lavender/70',
              titleFont: 'font-body', // Inter - Tertiary
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="h-full p-6 hover:shadow-xl transition-all border-transparent hover:border-lavender/20">
                <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${feature.gradient}`} />
                <h3 className={`${feature.titleFont} text-xl font-semibold mb-2 group-hover:text-teal-soft transition-colors`}>
                  {feature.title}
                </h3>
                <p className="font-body text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-teal-soft to-lavender text-gray-800"
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
