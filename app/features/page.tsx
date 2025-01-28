'use client';

import { motion, useInView } from 'framer-motion';
import {
  BarChart2,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
} from 'react-feather';

import { useRef } from 'react';

import { Card } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: 'Property Management',
    description: 'Efficiently manage your properties with our comprehensive dashboard.',
    icon: Home,
  },
  {
    title: 'Tenant Portal',
    description: 'Give tenants access to a dedicated portal for payments and maintenance requests.',
    icon: Users,
  },
  {
    title: 'Financial Tracking',
    description: 'Track rent payments, expenses, and generate financial reports.',
    icon: BarChart2,
  },
  {
    title: 'Maintenance Management',
    description: 'Handle maintenance requests and track repairs efficiently.',
    icon: Settings,
  },
  {
    title: 'Document Management',
    description: 'Store and manage all property-related documents securely.',
    icon: FileText,
  },
  {
    title: 'Payment Processing',
    description: 'Process rent payments and security deposits electronically.',
    icon: CreditCard,
  },
  {
    title: 'Scheduling',
    description: 'Schedule viewings, maintenance, and other property-related events.',
    icon: Calendar,
  },
  {
    title: 'Communication Hub',
    description: 'Streamline communication between property managers, owners, and tenants.',
    icon: MessageSquare,
  },
];

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export default function FeaturesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20' />
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center'
      >
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl'>
          <span className='block bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
            Modern Property Management
          </span>
          <span className='mt-3 block text-2xl font-medium text-gray-600 dark:text-gray-400'>
            Powered by Intelligent Features
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'
        >
          Streamline your operations with our comprehensive suite of tools designed for{' '}
          <span className='font-semibold text-blue-500'>property managers</span> and
          <span className='font-semibold text-blue-500'> real estate professionals</span>.
        </motion.p>
      </motion.div>

      {/* Enhanced Features Grid */}
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'
      >
        {features.map((feature, index) => (
          <motion.div key={feature.title} variants={staggerVariants} custom={index}>
            <Card
              className='group relative overflow-hidden p-8 transition-all hover:shadow-xl dark:hover:shadow-pastel-blue-900/20
              hover:-translate-y-2 h-full border border-transparent hover:border-pastel-blue-100 dark:hover:border-pastel-blue-900/50
              bg-gradient-to-b from-white/50 to-white/0 dark:from-gray-900/50 dark:to-gray-900/0'
            >
              {/* Animated Background */}
              <div
                className='absolute inset-0 bg-gradient-to-r from-pastel-blue-50/50 to-transparent opacity-0
                group-hover:opacity-100 dark:from-pastel-blue-900/50 transition-opacity duration-300'
              />

              {/* Hover Effect */}
              <div
                className='absolute inset-0 rounded-xl border border-pastel-blue-100/50 dark:border-pastel-blue-900/30
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
              />

              <div className='relative space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='p-3 bg-pastel-blue-400/10 rounded-lg group-hover:bg-pastel-blue-400/20 transition-colors'>
                    <feature.icon
                      className='h-8 w-8 text-pastel-blue-500 group-hover:text-pastel-blue-600 dark:text-pastel-blue-400
                      dark:group-hover:text-pastel-blue-300 transition-colors'
                    />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                    {feature.title}
                  </h3>
                </div>

                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  {feature.description}
                </p>

                {/* Animated Learn More */}
                <div className='mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span className='text-sm font-medium text-pastel-blue-500'>Learn More</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-pastel-blue-500'
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
      </motion.div>

      {/* Interactive Background Elements */}
      <div className='absolute left-0 right-0 top-0 -z-10 h-[800px] w-full overflow-hidden'>
        <div
          className='absolute inset-x-0 top-0 h-[400px] will-change-transform
          [mask-image:linear-gradient(to_bottom,transparent,black)]'
        >
          <div
            className='absolute inset-0 bg-gradient-to-b from-pastel-blue-400/20 to-transparent opacity-30
            dark:from-pastel-blue-900/30 dark:to-transparent'
          />
          <div
            className='absolute left-1/3 top-0 h-full w-1/4 bg-gradient-to-r from-pastel-blue-300/20 to-transparent
            blur-3xl dark:from-pastel-blue-900/30'
          />
        </div>
      </div>
    </motion.div>
  );
}
