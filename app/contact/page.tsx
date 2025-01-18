'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'react-feather'

import { Button } from '@/components/ui/button'

const contactInfo = [
  {
    icon: Phone,
    title: 'Talk to Sales',
    description: 'Speak to our friendly team',
    contact: '+1 (555) 000-0000',
    link: 'tel:+15550000000'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'We will get back to you within 24 hours',
    contact: 'info@hudsondigitalsolutions.com',
    link: 'mailto:info@hudsondigitalsolutions.com'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our office',
    contact: 'Plano, TX 75074',
    link: 'https://maps.google.com/maps?q=Plano,TX+75074'
  }
]

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                delay: 0.1
              }}
            >
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
              {/* Contact Info Cards */}
              <motion.div
                className="flex flex-col gap-8"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    className="relative overflow-hidden rounded-2xl p-6 shadow-lg group bg-white"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex rounded-lg bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
                          <item.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                        <p className="mt-2 text-base font-medium text-blue-600">{item.contact}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="rounded-2xl bg-white p-8 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <form className="space-y-8">
                  <div className="space-y-6">
                    <motion.div
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          rows={5}
                          className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      size="lg"
                    >
                      Send message
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Map Section */}
          <motion.div
            className="mt-16 rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53684.90367312405!2d-96.75296276572265!3d33.019481!2d-96.6993871!3d33.0195261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c22fb4b0c9487%3A0x608b1e5b7db11f30!2sPlano%2C%20TX%2075074!5e0!3m2!1sen!2sus!4v1709764537159!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
