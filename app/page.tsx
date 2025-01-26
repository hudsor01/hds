'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { routes } from '@/routes'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ArrowRight, CheckCircle, PlayArrow } from '@mui/icons-material'
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
  const [videoOpen, setVideoOpen] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: values => {
      const errors: { email?: string } = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Add your submit logic here
        console.log('Form submitted:', values)
        resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <main className="space-y-24">
      {/* Enhanced Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        {/* Add animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-black">
                Property Management
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Professional tools for modern property managers. Streamline your workflow and boost efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href={routes.mvp}>View MVP</Link>
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href={routes.dashboard}>Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                  asChild
                >
                  <Link href="/features">View Features</Link>
                </Button>
              </div>
              {/* Add social proof */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <span>Trusted by 1000+ property managers</span>
              </div>
              {/* Add video preview button */}
              <Button
                variant="outline"
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2"
              >
                <PlayArrow className="w-4 h-4" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-100 dark:border-blue-800"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
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

      {/* Add Testimonials Section before Stats */}
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
            <Card key={i} className="p-6 bg-blue-50/50">
              <div className="flex flex-col gap-4">
                <div className="text-blue-600">
                  {"★".repeat(5)}
                </div>
                <p className="text-lg italic">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
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
          {[
            { value: '500+', label: 'Properties Managed', chart: true },
            { value: '98%', label: 'Client Satisfaction', chart: false },
            { value: '24/7', label: 'Support Available', chart: false }
          ].map((stat, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                {stat.label}
              </div>
              {stat.chart && (
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" hide />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2563EB"
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
          className="text-3xl font-bold text-center mb-12"
        >
          Comprehensive Management Tools
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Property Analytics',
              desc: 'Real-time financial tracking and occupancy insights',
              gradient: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Tenant Portal',
              desc: 'Digital communication & payment infrastructure',
              gradient: 'from-blue-400 to-blue-500'
            },
            {
              title: 'Maintenance OS',
              desc: 'Workflow automation & progress tracking',
              gradient: 'from-blue-300 to-blue-400'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="h-full p-6 hover:shadow-xl transition-all border-transparent hover:border-blue-200">
                <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${feature.gradient}`} />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section with Formik */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of property management professionals
          </p>
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-transparent'} bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20`}
                {...formik.getFieldProps('email')}
              />
              <Button
                type="submit"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="mt-2 text-sm text-red-200">{formik.errors.email}</div>
            )}
          </form>
        </div>
      </motion.section>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/your-video-id"
              title="Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
