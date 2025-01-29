'use client';

import { routes } from '@/routes';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { BarChart2, DollarSign, FileText, Home, Tool, Users } from 'react-feather';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const stats = [
  {
    value: '24/7',
    label: 'Support Available',
    chart: false,
  },
  {
    value: '100%',
    label: 'Cloud-Based Solution',
    chart: false,
  },
  {
    value: 'Real-Time',
    label: 'Property Insights',
    chart: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className='space-y-24 bg-white'>
      {/* Hero Section */}
      <motion.section
        initial='initial'
        animate='animate'
        variants={staggerChildren}
        className='relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24'
      >
        {/* Background Elements */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#91C8FF_1px,transparent_1px),linear-gradient(to_bottom,#91C8FF_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1]' />
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-pastel-blue-400/20 rounded-full blur-3xl' />
          <div className='absolute bottom-20 right-10 w-72 h-72 bg-lavender/20 rounded-full blur-3xl' />
        </div>

        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Left Column */}
            <motion.div variants={fadeInUp} className='space-y-8'>
              <h1 className='font-display text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight'>
                <span className='block text-pastel-blue-500'>Simplify</span>
                <span className='block mt-3 text-gray-900'>Property Management</span>
              </h1>
              <p className='font-body text-xl md:text-2xl text-gray-600 max-w-2xl'>
                Professional tools for modern property managers. Streamline your workflow and boost
                efficiency.
              </p>

              {/* Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                {session ? (
                  <Button
                    className='w-full sm:w-auto bg-pastel-blue-500 text-white hover:bg-pastel-blue-600 shadow-lg shadow-pastel-blue-500/25 hover:shadow-pastel-blue-500/40 transform hover:scale-105 transition-all duration-200'
                    asChild
                  >
                    <Link href={routes.dashboard}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      className='w-full sm:w-auto bg-pastel-blue-500 text-white hover:bg-pastel-blue-600 shadow-lg shadow-pastel-blue-500/25 hover:shadow-pastel-blue-500/40 transform hover:scale-105 transition-all duration-200'
                      asChild
                    >
                      <Link href={routes.auth.register}>Get Started Free</Link>
                    </Button>
                    <Button
                      variant='outline'
                      className='w-full sm:w-auto border-2 border-pastel-blue-400 text-pastel-blue-600 hover:bg-pastel-blue-50 transform hover:scale-105 transition-all duration-200'
                      asChild
                    >
                      <Link href={routes.auth.login}>Learn More</Link>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              variants={fadeInUp}
              className='relative rounded-2xl overflow-hidden shadow-2xl border border-pastel-blue-200'
            >
              <div className='absolute inset-0 bg-linear-to-br from-pastel-blue-100/20 to-pastel-blue-50/20' />
              <Image
                src='/dashboard-preview.png'
                alt='Dashboard Preview'
                width={800}
                height={600}
                className='w-full h-auto'
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
        className='max-w-7xl mx-auto px-4'
      >
        <div className='grid md:grid-cols-2 gap-8'>
          {[
            {
              quote:
                'HDS transformed how we manage our properties. The efficiency gains are remarkable.',
              author: 'Sarah Johnson',
              role: 'Property Manager',
              company: 'Urban Living Properties',
              rating: 5,
              image: '/team/sarah.jpg',
            },
            {
              quote: "The best property management software we've used. Intuitive and powerful.",
              author: 'Michael Chen',
              role: 'CEO',
              company: 'Pacific Real Estate Group',
              rating: 5,
              image: '/team/michael.jpg',
            },
          ].map((testimonial, i) => (
            <Card
              key={i}
              className='group p-6 bg-gradient-to-br from-white to-pastel-blue-50 hover:from-pastel-blue-50 hover:to-white transition-all duration-300 border border-pastel-blue-200/20 hover:border-pastel-blue-300/30 hover:shadow-lg'
            >
              <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-2 text-pastel-blue-400'>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <svg
                      key={index}
                      className='w-5 h-5 fill-current transform group-hover:scale-110 transition-transform duration-200'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <p className='font-display text-lg italic text-gray-800'>{testimonial.quote}</p>
                <div className='flex items-center gap-4'>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden border-2 border-pastel-blue-200 group-hover:border-pastel-blue-300 transition-colors'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <div className='font-sans font-semibold text-gray-900'>
                      {testimonial.author}
                    </div>
                    <div className='font-body text-sm text-gray-600'>
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='max-w-7xl mx-auto px-4'
        id='features'
      >
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Powerful Features</h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Everything you need to manage your properties efficiently
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: 'Property Management',
              description: 'Streamline your property portfolio with powerful tools and insights.',
              Icon: Home,
            },
            {
              title: 'Tenant Portal',
              description: 'Give tenants easy access to payments and maintenance requests.',
              Icon: Users,
            },
            {
              title: 'Financial Tracking',
              description: 'Monitor rent payments, expenses, and generate detailed reports.',
              Icon: DollarSign,
            },
            {
              title: 'Maintenance Management',
              description: 'Handle maintenance requests and track repairs efficiently.',
              Icon: Tool,
            },
            {
              title: 'Document Storage',
              description: 'Securely store and manage all property-related documents.',
              Icon: FileText,
            },
            {
              title: 'Analytics Dashboard',
              description: 'Get real-time insights into your property performance.',
              Icon: BarChart2,
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className='group relative h-full p-6 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-pastel-blue-200/20 hover:border-pastel-blue-300/50 bg-gradient-to-br from-white to-transparent hover:from-pastel-blue-50/80 hover:to-white'>
                {/* Background Glow Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-pastel-blue-100/0 to-pastel-blue-200/0 group-hover:from-pastel-blue-100/20 group-hover:to-pastel-blue-200/20 transition-all duration-500 -z-10' />

                <div className='flex flex-col items-start gap-6'>
                  <div className='transform group-hover:scale-110 transition-all duration-300 p-4 rounded-xl bg-gradient-to-br from-pastel-blue-100/50 to-pastel-blue-50/50 group-hover:from-pastel-blue-200/50 group-hover:to-pastel-blue-100/50 shadow-lg shadow-pastel-blue-100/10 group-hover:shadow-pastel-blue-200/20'>
                    <feature.Icon className='w-8 h-8 text-pastel-blue-500 group-hover:text-pastel-blue-600 transform transition-colors duration-300' />
                  </div>

                  <div className='space-y-3'>
                    <h3 className='text-xl font-semibold text-gray-900 group-hover:text-pastel-blue-600 transition-colors duration-300'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>

                  <div className='mt-auto flex items-center gap-2 text-pastel-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                    <span className='text-sm font-medium'>Learn more</span>
                    <svg
                      className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='max-w-7xl mx-auto px-4'
      >
        <div className='grid md:grid-cols-3 gap-8'>
          {stats.map((stat, i) => (
            <Card
              key={i}
              className='p-6 hover:shadow-lg transition-shadow border-pastel-blue-200/20'
            >
              <div className='text-3xl font-bold text-pastel-blue-500 mb-2'>{stat.value}</div>
              <div className='text-gray-600 dark:text-gray-300 mb-4 font-body'>{stat.label}</div>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className='bg-linear-to-r from-pastel-blue-300 to-pastel-blue-100 text-gray-800'
      >
        <div className='max-w-4xl mx-auto px-4 py-16 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            {session ? 'Ready to Manage Your Properties?' : 'Start Your Free Trial Today'}
          </h2>
          <p className='text-xl mb-8 opacity-90'>
            {session
              ? 'Access your dashboard to get started'
              : 'No credit card required • 14-day free trial • Full access'}
          </p>
          {session ? (
            <Button className='bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto' asChild>
              <Link href={routes.dashboard}>Go to Dashboard</Link>
            </Button>
          ) : (
            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Button className='bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto' asChild>
                <Link href={routes.auth.register}>Start Free Trial</Link>
              </Button>
              <Button
                variant='outline'
                className='border-white text-white hover:bg-white/10 w-full sm:w-auto'
                asChild
              >
                <Link href={routes.auth.login}>Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
}
