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

export interface ToggleProps extends Omit<ToggleButtonProps, 'onChange'> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, onPressedChange, children, ...props }, ref) => {
    const handleChange = React.useCallback(
      (_: React.MouseEvent<HTMLElement>, selected: boolean) => {
        onPressedChange?.(selected)
      },
      [onPressedChange]
    )

    return (
      <StyledToggleButton
        ref={ref}
        selected={pressed}
        onChange={handleChange}
        className={cn(
          'focus-visible:outline-hidden hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </StyledToggleButton>
    )
  }
)

Toggle.displayName = 'Toggle'
