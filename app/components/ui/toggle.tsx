'use client'

import { cn } from '@/app/lib/utils'
import type { ToggleButtonProps } from '@mui/material'
import { ToggleButton as MuiToggleButton, styled } from '@mui/material'
import * as React from 'react'

const StyledToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))

export interface ToggleProps extends Omit<ToggleButtonProps, 'onChange'> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  ?: boolean
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
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
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
