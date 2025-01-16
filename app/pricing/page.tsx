'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Basic',
    price: '$49',
    description: 'Perfect for small property owners',
    features: [
      'Up to 5 properties',
      'Basic tenant portal',
      'Maintenance requests',
      'Online rent payments',
      'Document storage',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Ideal for growing portfolios',
    features: [
      'Up to 20 properties',
      'Advanced tenant portal',
      'Maintenance management',
      'Online payments & accounting',
      'Document management',
      'Priority email & chat support',
      'Financial reporting',
      'Tenant screening',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$499',
    description: 'For large property portfolios',
    features: [
      'Unlimited properties',
      'Full-featured tenant portal',
      'Advanced maintenance system',
      'Complete financial suite',
      'Advanced document management',
      '24/7 priority support',
      'Custom reporting',
      'API access',
      'Dedicated account manager',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Simple, Transparent
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Pricing Plans
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Choose the perfect plan for your property management needs.
          All plans include our core features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative flex flex-col p-8 ${
              tier.popular
                ? 'border-2 border-blue-500 shadow-lg'
                : 'border border-gray-200'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-500 px-3 py-1 text-center text-sm font-medium text-white">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {tier.description}
              </p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {tier.price}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </p>
            </div>
            <ul className="mb-8 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-3 h-5 w-5 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className={`mt-auto ${
                tier.popular
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
              }`}
            >
              Get Started
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQ Note */}
      <p className="mt-16 text-center text-base text-gray-600 dark:text-gray-400">
        Have questions about our pricing?{' '}
        <Button variant="link" className="font-semibold text-blue-500">
          Contact our sales team
        </Button>
      </p>
    </div>
  )
}
