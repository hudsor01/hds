'use client'

import { cn } from '@/lib/utils'
import { styled, ToggleButton, type ToggleButtonProps } from '@mui/material'
import * as React from 'react'

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}))

export interface ToggleProps extends Omit<ToggleButtonProps, 'onChange' | 'selected'> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  className?: string
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, children, ...props }, ref) => {
    return (
      <StyledToggleButton
        selected={!!pressed}
        className={cn(className)}
        onChange={(_event, isSelected) => {
          onPressedChange?.(isSelected)
        }}
        {...props}
      >
        {children}
      </StyledToggleButton>
    )
  }
)

Toggle.displayName = 'Toggle'
