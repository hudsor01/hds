'use client';

import { routes } from '@/routes';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { useState } from 'react';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const pricingTiers = [
  {
    title: 'Free Trial',
    description: 'Perfect for evaluating our platform',
    price: '$0',
    duration: '45 days',
    priceId: null,
    features: [
      'Up to 3 properties',
      'Basic tenant management',
      'Simple maintenance tracking',
      'Basic financial reporting',
      'Email support',
    ],
    highlighted: false,
    buttonText: 'Start Free Trial',
  },
  {
    title: 'Core',
    description: 'For individual landlords and small portfolios',
    price: '$29',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_CORE,
    features: [
      'Up to 10 properties',
      'Advanced tenant screening',
      'Maintenance request system',
      'Basic financial analytics',
      'Document storage',
      'Email & chat support',
      'Mobile app access',
    ],
    highlighted: false,
    buttonText: 'Subscribe Now',
  },
  {
    title: 'Growth',
    description: 'Ideal for growing property management businesses',
    price: '$69',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH,
    features: [
      'Up to 50 properties',
      'Everything in Core',
      'Automated rent collection',
      'Advanced financial analytics',
      'Document management',
      'Priority support',
      'Custom branding',
      'API access',
      'Team collaboration',
    ],
    highlighted: true,
    buttonText: 'Get Started',
  },
  {
    title: 'Unlimited',
    description: 'Enterprise-grade solution for large portfolios',
    price: 'Custom',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_UNLIMITED,
    features: [
      'Unlimited properties',
      'Everything in Elite',
      'Enterprise SLA',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise deployment option',
      '24/7 phone support',
      'Custom training',
      'Disaster recovery',
      'Advanced security features',
    ],
    highlighted: false,
    buttonText: 'Contact Enterprise',
  },
];

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string>('Growth');

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8'>
      <div className='text-center'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
          Simple, transparent pricing
        </h2>
        <p className='mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground'>
          Choose the perfect plan for your property management needs
        </p>
      </div>
      <div className='mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 sm:max-w-none'>
        {pricingTiers.map((tier, index) => (
          <div
            key={index}
            onClick={() => setSelectedTier(tier.title)}
            className={`rounded-lg border p-8 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTier === tier.title
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-500 ring-opacity-50'
                : 'border-border hover:border-blue-200'
            }`}
          >
            <h3 className='text-xl sm:text-2xl font-bold'>{tier.title}</h3>
            <p className='mt-2 text-sm sm:text-base text-muted-foreground'>{tier.description}</p>
            <div className='mt-4 flex flex-col sm:flex-row sm:items-baseline'>
              <span className='text-4xl font-bold sm:text-5xl'>{tier.price}</span>
              <span className='text-muted-foreground sm:ml-2'>/{tier.duration}</span>
            </div>
            <ul className='mt-8 space-y-4'>
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='flex items-center'>
                  <svg
                    className='h-5 w-5 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  <span className='ml-3'>{feature}</span>
                </li>
              ))}
            </ul>
            <PricingCheckoutButton
              priceId={tier.priceId ?? null}
              text={tier.buttonText}
              highlighted={selectedTier === tier.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const PricingCheckoutButton = ({
  priceId,
  text,
  highlighted,
}: {
  priceId: string | null;
  text: string;
  highlighted: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);

      if (text === 'Contact Sales') {
        router.push(routes.contact as Route);
        return;
      }

      if (!priceId) {
        if (!session) {
          router.push(routes.auth.register as Route);
          return;
        }

        toast.loading('Setting up your trial...');
        const response = await fetch('/api/subscribe/free', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trialDays: 14 }),
        });

        if (response.ok) {
          router.push('/dashboard' as Route);
          toast.success('Free trial activated! Enjoy your 14-day access.');
        } else {
          const error = await response.json();
          throw new Error(error.message || 'Failed to activate trial');
        }
        return;
      }

      if (!session) {
        router.push(`${routes.auth.login}?callbackUrl=${encodeURIComponent('/pricing')}` as Route);
        return;
      }

      toast.loading('Preparing checkout...');
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  return (
    <Button
      variant={highlighted ? 'default' : 'outline'}
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full mt-4 font-semibold transition-all duration-300 ${
        highlighted
          ? 'bg-blue-500 hover:bg-blue-600 text-white scale-105'
          : 'hover:border-blue-200 hover:scale-102'
      }`}
    >
      {isLoading ? 'Processing...' : text}
    </Button>
  );
};
