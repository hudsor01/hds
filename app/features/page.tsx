'use client'

import { PageTransition } from '@/components/layout/page-transition'
import { PublicLayout } from '@/components/layout/public-layout'
import { motion } from 'framer-motion'
import {
  BarChart,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageCircle,
  Settings,
  Users
} from 'react-feather'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'Property Management',
    description: 'Efficiently manage your properties with our comprehensive dashboard.',
    icon: Home,
    details: [
      'Automated rent collection',
      'Maintenance request tracking',
      'Property portfolio dashboard',
      'Tenant portal access'
    ]
  },
  {
    title: 'Financial Tools',
    description: 'Track and manage all your property-related finances in one place.',
    icon: BarChart,
    details: [
      'Real-time financial reporting',
      'Expense tracking',
      'Budget management',
      'Tax document preparation'
    ]
  },
  {
    title: 'Communication Hub',
    description: 'Stay connected with tenants, owners, and maintenance staff.',
    icon: MessageCircle,
    details: [
      'Integrated messaging system',
      'Automated notifications',
      'Document sharing',
      'Announcement broadcasts'
    ]
  },
  {
    title: 'Analytics & Reporting',
    description: 'Make data-driven decisions with comprehensive insights.',
    icon: FileText,
    details: [
      'Custom report builder',
      'Performance metrics',
      'Occupancy tracking',
      'Revenue analysis'
    ]
  },
  {
    title: 'Maintenance Management',
    description: 'Streamline maintenance requests and vendor relationships.',
    icon: Settings,
    details: [
      'Work order system',
      'Vendor management',
      'Preventive maintenance',
      'Service history tracking'
    ]
  },
  {
    title: 'Security & Compliance',
    description: 'Keep your data secure and maintain compliance standards.',
    icon: CreditCard,
    details: ['Data encryption', 'Access control', 'Audit trails', 'Compliance reporting']
  }
]

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-4xl font-bold text-gray-900"
            >
              Platform Features
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-2xl text-xl text-gray-600"
            >
              Everything you need to manage your properties efficiently and grow your portfolio
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group surface relative overflow-hidden p-6"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-opacity-10 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-color)] text-[var(--primary-color)]">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="mb-6 text-gray-600">{feature.description}</p>
                <ul className="space-y-3 text-gray-600">
                  {feature.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="h-5 w-5 text-[var(--primary-color)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
                <Button variant="primary" className="mt-6">
                  Learn More
                </Button>
                <div className="absolute inset-x-0 bottom-0 h-1 transform bg-[var(--primary-color)] transition-all duration-200 group-hover:h-1.5" />
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </PublicLayout>
  )
}
