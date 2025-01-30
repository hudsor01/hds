'use client';

import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface StripeCheckoutButtonProps {
  priceId: string | null;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
}

export function StripeCheckoutButton({
  priceId,
  variant = 'contained',
  size = 'large',
}: StripeCheckoutButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const isDisabled = loading || (!priceId && Boolean(session)) || (Boolean(priceId) && !session);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Handle free trial signup
      if (!priceId) {
        // Redirect to registration with free trial flag
        window.location.href = '/auth/register?plan=trial';
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCheckout}
      disabled={isDisabled}
      sx={{
        background:
          variant === 'contained' ? 'linear-gradient(45deg, #635bff 0%, #a259ff 100%)' : undefined,
        fontWeight: 600,
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      {loading ? 'Loading...' : priceId ? 'Subscribe Now' : 'Start Free Trial'}
    </Button>
  );
}
