'use client'

import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: '20$',
    features: [
      '10 users included',
      '2GB of storage',
      'Email support',
      'Help center access',
    ],
  },
  {
    name: 'Pro',
    price: '30$',
    features: [
      '20 users included',
      '5GB of storage',
      'Email support',
      'Help center access',
      'Phone support',
      'Community access',
    ],
    highlighted: true,
  },
]

export function PricingCards() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 shadow-sm sm:px-8 lg:p-12 ${
              plan.highlighted
                ? 'border-indigo-600 ring-1 ring-indigo-600 sm:order-last'
                : 'border-gray-200'
            }`}
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                {plan.name}
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {plan.price}
                </strong>
                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-indigo-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/auth/register"
              className={`mt-8 block rounded-full border px-12 py-3 text-center text-sm font-medium transition focus:outline-hidden focus:ring-3 ${
                plan.highlighted
                  ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 active:text-indigo-500'
                  : 'border-indigo-600 bg-white text-indigo-600 hover:ring-1 hover:ring-indigo-600 active:text-indigo-500'
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
