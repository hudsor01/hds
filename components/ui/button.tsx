import { Button as MuiButton } from '@mui/material'
import type { ButtonProps as MuiButtonProps } from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
  // Add any custom props here if needed
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <MuiButton variant="contained" {...props}>
      {children}
    </MuiButton>
  )
}
