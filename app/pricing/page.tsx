'use client'

import { useState } from 'react'
import { PageTransition } from '@/components/layout/page-transition'
import { PublicLayout } from '@/components/layout/public-layout'
import {
  Container,
  Section,
  PageHeader,
  PageTitle,
  PageDescription
} from '@/components/ui/container'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check, X } from 'react-feather'

type BillingFrequency = 'monthly' | 'annually'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small property owners',
    monthlyPrice: 49,
    annualPrice: 470,
    features: [
      'Up to 5 properties',
      'Basic reporting',
      'Email support',
      'Mobile app access',
      'Tenant portal',
      'Maintenance requests',
      'Document storage',
      'Payment processing'
    ],
    limitations: ['Advanced analytics', 'API access', 'Custom integrations', 'Dedicated support']
  },
  {
    name: 'Professional',
    description: 'Ideal for growing portfolios',
    monthlyPrice: 99,
    annualPrice: 950,
    popular: true,
    features: [
      'Up to 20 properties',
      'Advanced analytics',
      'Priority support',
      'Mobile app access',
      'Tenant portal',
      'Maintenance requests',
      'Document storage',
      'Payment processing',
      'API access',
      'Custom reports',
      'Team collaboration'
    ],
    limitations: ['Custom integrations', 'Dedicated support', 'White-label options']
  },
  {
    name: 'Enterprise',
    description: 'For large property portfolios',
    features: [
      'Unlimited properties',
      'Custom integrations',
      'Dedicated support',
      'White-label options',
      'Mobile app access',
      'Tenant portal',
      'Maintenance requests',
      'Document storage',
      'Payment processing',
      'API access',
      'Custom reports',
      'Team collaboration',
      'Advanced analytics',
      'Priority support'
    ],
    limitations: []
  }
]

export default function PricingPage() {
  const [frequency, setFrequency] = useState<BillingFrequency>('monthly')

  return (
    <PublicLayout>
      <PageTransition>
        <Section>
          <Container>
            <PageHeader>
              <PageTitle>Simple, Transparent Pricing</PageTitle>
              <PageDescription>
                Choose the perfect plan for your property management needs
              </PageDescription>
            </PageHeader>

            <div className="mb-12 flex justify-center">
              <Card variant="default" className="inline-flex p-1">
                <div className="flex space-x-1">
                  <Button
                    variant={frequency === 'monthly' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFrequency('monthly')}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={frequency === 'annually' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setFrequency('annually')}
                  >
                    Annually
                    <span className="ml-1 text-xs text-emerald-500">Save 20%</span>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  variant={plan.popular ? 'highlight' : 'interactive'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="relative overflow-hidden"
                >
                  {plan.popular && (
                    <div className="absolute top-[25px] right-[-35px] rotate-45 bg-[var(--primary-color)] px-10 py-1 text-sm text-white">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                    {plan.monthlyPrice ? (
                      <div className="mt-4">
                        <div className="flex items-end">
                          <span className="text-4xl font-bold text-gray-900">
                            ${frequency === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          </span>
                          <span className="ml-2 text-gray-600">
                            /{frequency === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {frequency === 'annually' && (
                          <p className="mt-1 text-sm text-emerald-500">
                            Save ${(plan.monthlyPrice * 12 - plan.annualPrice).toFixed(2)} annually
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">Custom</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button className="mb-8 w-full">
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                    <div>
                      <h4 className="mb-4 text-sm font-semibold text-gray-900">
                        Features included:
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map(feature => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.limitations.map(limitation => (
                          <li
                            key={limitation}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <X className="mt-0.5 h-4 w-4 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 text-center"
            >
              <p className="text-sm text-gray-600">
                All plans include access to our mobile app and customer support.
                <br />
                Need a custom plan?{' '}
                <a href="/contact" className="text-[var(--primary-color)] hover:underline">
                  Contact us
                </a>
              </p>
            </motion.div>
          </Container>
        </Section>
      </PageTransition>
    </PublicLayout>
  )
}
