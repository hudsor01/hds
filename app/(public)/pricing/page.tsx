'use client'

import { Container } from '@mui/material'
import { Navbar } from '@/components/layouts/navbar'
import { motion } from 'framer-motion'
import { CheckCircle } from '@mui/icons-material'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: '/mo',
    features: [
      '1 property included',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Community support',
      'Mobile app access'
    ],
    buttonText: 'Start for free',
    buttonVariant: 'outlined'
  },
  {
    name: 'Basic',
    price: '29',
    period: '/mo',
    features: [
      'Up to 5 properties',
      'Basic reporting',
      'Tenant portal access',
      'Document storage',
      'Email support',
      'Mobile app access'
    ],
    buttonText: 'Start free trial',
    buttonVariant: 'outlined'
  },
  {
    name: 'Professional',
    price: '79',
    period: '/mo',
    features: [
      'Up to 8 properties',
      'Advanced analytics',
      'Maintenance tracking',
      'Online rent collection',
      'Priority support',
      'Custom reporting',
      'API access'
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited properties',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Training sessions',
      'Custom workflows'
    ],
    buttonText: 'Contact sales',
    buttonVariant: 'outlined'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-20"
      >
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-semibold mb-4"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              Choose the perfect plan for your property management needs.
              <br />All plans include a 14-day free trial.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-lg border ${
                  plan.popular 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    {plan.price !== 'Custom' && '$'}
                    <span className="text-4xl font-semibold">{plan.price}</span>
                    {plan.period && (
                      <span className="ml-1 text-gray-500">{plan.period}</span>
                    )}
                  </div>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckCircle 
                          className="flex-shrink-0 h-5 w-5 text-blue-500" 
                          style={{ marginRight: '0.5rem' }}
                        />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-8 w-full py-2 px-4 rounded-md transition-all duration-200 ${
                      plan.buttonVariant === 'contained'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'border border-blue-500 text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>
    </div>
  )
}