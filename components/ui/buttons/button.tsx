'use client'

import MuiButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { forwardRef } from 'react'

export interface ButtonProps extends React.ComponentProps<typeof MuiButton> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    return <MuiButton ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button }

export interface LoadingButtonProps extends React.ComponentProps<typeof MuiButton> {
  loading?: boolean
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <MuiButton {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  )
}
