import '@mui/material/styles'
import type { ReactNode } from 'react'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    // Remove if using default breakpoints
  }
}

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export interface PricingCardProps {
  title: string
  description: string
  price: string
  duration: string
  features: string[]
  highlighted?: boolean
  buttonText: string
  onSubscribe: () => void
}
