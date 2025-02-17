export interface StripeCheckoutButtonProps {
  priceId: string | null
  variant?: 'text' | 'outlined' | 'contained'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}
