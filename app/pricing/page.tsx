'use client'

import { routes } from '@/routes'
import { Button, Container, Grid, useTheme } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const pricingTiers = [
  {
    title: 'Free Trial',
    description: 'Perfect for evaluating our platform',
    price: '$0',
    duration: '14 days',
    priceId: null,
    features: [
      'Up to 3 properties',
      'Basic tenant management',
      'Simple maintenance tracking',
      'Basic financial reporting',
      'Email support'
    ],
    highlighted: false
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
      'Mobile app access'
    ],
    highlighted: false
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
      'Team collaboration'
    ],
    highlighted: true
  },
  {
    title: 'Elite',
    description: 'For established property management companies',
    price: '$199',
    duration: 'per month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE,
    features: [
      'Up to 100 properties',
      'Everything in Growth',
      'Advanced reporting',
      'Bulk operations',
      'Custom workflows',
      'Premium support',
      'White-label options',
      'Advanced API access',
      'Multi-user roles',
      'Data exports'
    ],
    highlighted: false
  }
]

const PricingCheckoutButton = ({ priceId, text }: { priceId: string | null; text: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      toast('Processing your request...');

      if (!priceId) {
        if (!session) {
          router.push(routes.auth.register);
          return;
        }

        const response = await fetch('/api/subscribe/free', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trialDays: 14 }),
        });

        if (response.ok) {
          router.push('/dashboard');
          toast.success('Free trial activated! Enjoy your 14-day access.');
        }
        return;
      }

      if (!session) {
        toast.error('Please sign in to subscribe');
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Payment processing failed');

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
    }
  };

  return (
    <Button
      variant={priceId ? 'contained' : 'outlined'}
      size="large"
      onClick={handleClick}
      disabled={isLoading}
      fullWidth
      sx={{
        mt: 2,
        fontWeight: 600,
        ...(priceId && {
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' }
        })
      }}
    >
      {isLoading ? 'Processing...' : text}
    </Button>
  );
};

export default function PricingPage() {
  const theme = useTheme()

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Grid container spacing={3}>
        {pricingTiers.map((tier) => (
          <Grid key={tier.title} xs={12} sm={6} md={4}>
            {tier.priceId ? (
              <PricingCheckoutButton
                priceId={tier.priceId ?? null}
                text={tier.highlighted ? 'Subscribe' : 'Start Free Trial'}
              />
            ) : (
              <PricingCheckoutButton
                priceId={null}
                text={tier.title}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
