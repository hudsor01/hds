'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Settings, Shield, Users } from 'react-feather'
import { Button } from './components/ui/button'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8" ref={targetRef}>
          <motion.div
            className="absolute inset-0 -z-10"
            style={{ opacity }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-70" />
            <motion.div
              className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/80 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50"
              animate={{
                skewX: [-30, -32, -30],
                opacity: [0.8, 0.9, 0.8]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.div
            className="mx-auto max-w-2xl text-center"
            style={{ y, scale }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col gap-2 sm:gap-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                delay: 0.2
              }}
            >
              <span>Simplify</span>
              <span>Property Management</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600 max-w-xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Streamline your property management with our comprehensive platform. From
              rent collection to maintenance requests, we've got you covered.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  Get Started
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-blue-50/50 to-white/0" />
          <motion.div
            className="mx-auto max-w-7xl px-6 lg:px-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div
              className="mx-auto max-w-2xl text-center"
              variants={fadeIn}
            >
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Powerful <span>Features</span>
              </motion.h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Everything you need to manage your properties efficiently
              </p>
            </motion.div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="flex flex-col group"
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow duration-300">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                        <motion.div
                          className="rounded-lg bg-blue-500/10 p-2 ring-1 ring-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <feature.icon className="h-5 w-5 flex-none text-blue-500" aria-hidden="true" />
                        </motion.div>
                        {feature.name}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                        <p className="flex-auto">{feature.description}</p>
                      </dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
          <motion.div
            className="absolute inset-0 -z-10"
            initial={false}
            animate={{
              backgroundImage: [
                "radial-gradient(45rem 50rem at top,rgba(59,130,246,0.3),rgba(17,24,39,1))",
                "radial-gradient(45rem 50rem at top,rgba(99,102,241,0.3),rgba(17,24,39,1))",
                "radial-gradient(45rem 50rem at top,rgba(59,130,246,0.3),rgba(17,24,39,1))"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900/80 shadow-xl shadow-blue-600/10 ring-1 ring-blue-50/10"
            animate={{
              skewX: [-30, -32, -30],
              opacity: [0.8, 0.9, 0.8]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="mx-auto max-w-7xl px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto max-w-2xl lg:text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Why Choose{" "}
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Us
                </motion.span>
              </motion.h2>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Experience the benefits of modern property management
              </motion.p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Smart Property Management',
    description:
      'Streamline your property operations with our intelligent management tools and automated workflows.',
    icon: Settings,
  },
  {
    name: 'Secure Data Handling',
    description:
      'Your data is protected with enterprise-grade security and regular backups.',
    icon: Shield,
  },
  {
    name: 'Multi-tenant Support',
    description:
      'Manage multiple properties and tenants from a single, unified dashboard.',
    icon: Users,
  },
]
