'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart2,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users
} from 'react-feather'

const features = [
  {
    title: 'Property Management',
    description:
      'Efficiently manage multiple properties with our comprehensive dashboard.',
    icon: Home,
  },
  {
    title: 'Tenant Portal',
    description:
      'Give tenants a modern platform to submit requests and make payments.',
    icon: Users,
  },
  {
    title: 'Financial Tracking',
    description:
      'Track rent payments, expenses, and generate detailed financial reports.',
    icon: CreditCard,
  },
  {
    title: 'Maintenance Management',
    description:
      'Handle maintenance requests and track repairs with ease.',
    icon: Settings,
  },
  {
    title: 'Document Management',
    description:
      'Store and manage leases, contracts, and important documents securely.',
    icon: FileText,
  },
  {
    title: 'Payment Processing',
    description:
      'Accept online rent payments and automate payment reminders.',
    icon: CreditCard,
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Get insights into your property performance with detailed analytics.',
    icon: BarChart2,
  },
  {
    title: 'Communication Tools',
    description:
      'Stay connected with tenants through our integrated messaging system.',
    icon: MessageSquare,
  },
  {
    title: 'Scheduling',
    description:
      'Manage viewings, maintenance visits, and important property dates.',
    icon: Calendar,
  },
]

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Powerful Features for Modern
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Property Management
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Everything you need to manage your properties efficiently in one platform.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group relative overflow-hidden p-6 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-950" />
            <div className="relative">
              <feature.icon className="h-8 w-8 text-blue-500" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
