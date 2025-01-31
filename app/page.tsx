'use client';

import { SignUp, useAuth, useUser } from '@clerk/nextjs'
import { Button, Card, CardContent } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Key } from 'react'
import { BarChart2, DollarSign, FileText, Home, Tool, Users } from 'react-feather'
import { routes } from './routes'


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

const testimonials = [
  {
    quote: 'HDS transformed how we manage our properties. The efficiency gains are remarkable.',
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
];

// Add features data after testimonials
const features = [
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
];

// Update the Features section in the component
{
  /* Features Section */
}
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
    {features.map((feature, i) => (
      <motion.div
        key={feature.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
      >
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(to bottom right, white, transparent)',
            border: '1px solid rgba(var(--pastel-blue-200), 0.2)',
            p: 3,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 3,
              borderColor: 'rgba(var(--pastel-blue-300), 0.5)',
              background:
                'linear-gradient(to bottom right, rgba(var(--pastel-blue-50), 0.8), white)',
            },
          }}
        >
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div className='transform group-hover:scale-110 transition-all duration-300 p-4 rounded-xl bg-gradient-to-br from-pastel-blue-100/50 to-pastel-blue-50/50'>
              <feature.Icon className='w-8 h-8 text-pastel-blue-500' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>{feature.title}</h3>
            <p className='text-gray-600'>{feature.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
</motion.section>;

export default function HomePage() {
  const { user } = useUser()
  const { isSignedIn } = useAuth();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen items-center justify-center"
      >
        <SignUp />
      </motion.div>
    );
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className='space-y-24 bg-white'
    >
      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className='flex flex-col sm:flex-row gap-4'>
          {isSignedIn ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant='contained'
                component={Link}
                href={routes.dashboard}
                sx={{
                  bgcolor: 'white',
                  color: 'var(--pastel-blue-600)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
                component={Link}
                href={routes.dashboard}
              >
                Go to Dashboard
              </Button>
            </motion.div>
          ) : (
            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Button
                variant='contained'
                sx={{
                  bgcolor: 'white',
                  color: 'var(--pastel-blue-600)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
                component={Link}
                href='/sign-up'
              >
                Start Free Trial
              </Button>
              <Button
                variant='outlined'
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                component={Link}
                href='/sign-in'
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section variants={fadeInUp}>
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <Card>
              {/* Feature content remains the same */}
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={fadeInUp}
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
          {features.map((feature: { title: Key | null | undefined }, i: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(to bottom right, white, transparent)',
                  border: '1px solid rgba(var(--pastel-blue-200), 0.2)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    borderColor: 'rgba(var(--pastel-blue-300), 0.5)',
                    background:
                      'linear-gradient(to bottom right, rgba(var(--pastel-blue-50), 0.8), white)',
                  },
                }}
              >
                <CardContent
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  {/* Feature content remains the same */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid md:grid-cols-3 gap-8'>
          {stats.map((stat, i) => (
            <Card
              key={i}
              sx={{
                p: 3,
                transition: 'box-shadow 0.3s ease',
                border: '1px solid rgba(var(--pastel-blue-200), 0.2)',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <div className='text-3xl font-bold text-pastel-blue-500 mb-2'>{stat.value}</div>
                <div className='text-gray-600 dark:text-gray-300 mb-4 font-body'>{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        {isSignedIn ? (
          <Button
            variant='contained'
            sx={{
              bgcolor: 'white',
              color: 'var(--pastel-blue-600)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
            component={Link}
            href={routes.dashboard}
          >
            Go to Dashboard
          </Button>
        ) : (
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              variant='contained'
              sx={{
                bgcolor: 'white',
                color: 'var(--pastel-blue-600)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              component={Link}
              href='/sign-up'
            >
              Start Free Trial
            </Button>
            <Button
              variant='outlined'
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              component={Link}
              href='/sign-in'
            >
              Sign In
            </Button>
          </div>
        )}
      </main>
    );
}
function createClient (cookieStore: ReadonlyRequestCookies)
{
  throw new Error('Function not implemented.')
}
