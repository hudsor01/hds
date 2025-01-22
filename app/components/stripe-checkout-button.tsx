'use client'

import { Button } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

interface StripeCheckoutButtonProps {
  priceId: string
  variant?: 'text' | 'outlined' | 'contained'
  size?: 'small' | 'medium' | 'large'
}

export function StripeCheckoutButton({
  priceId,
  variant = 'contained',
  size = 'large'
}: StripeCheckoutButtonProps) {
  const { data: session } = useSession()

  const handleCheckout = async () => {
    const stripe = await stripePromise
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const { sessionId } = await response.json()

    await stripe?.redirectToCheckout({
      sessionId
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCheckout}
      disabled={!session}
      sx={{
        background: variant === 'contained' ? 'linear-gradient(45deg, #635bff 0%, #a259ff 100%)' : undefined,
        fontWeight: 600,
        '&:hover': {
          opacity: 0.9
        }
      }}
    >
      Subscribe Now
    </Button>
  )
}
