'use client'

import { cn } from '@/app/lib/utils'
import type { ToggleButtonGroupProps } from '@mui/material'
import { ToggleButtonGroup as MuiToggleButtonGroup, styled } from '@mui/material'
import * as React from 'react'

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  gap: theme.spacing(1),
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

export interface ToggleGroupProps extends Omit<ToggleButtonGroupProps, 'onChange'> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type = 'single', defaultValue, value, onValueChange, children, ...props }, ref) => {
    const handleChange = React.useCallback(
      (_: React.MouseEvent<HTMLElement>, value: string | string[]) => {
        onValueChange?.(value)
      },
      [onValueChange]
    )

    return (
      <StyledToggleButtonGroup
        ref={ref}
        exclusive={type === 'single'}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn('inline-flex items-center justify-center gap-1', className)}
        {...props}
      >
        {children}
      </StyledToggleButtonGroup>
    )
  }
)
ToggleGroup.displayName = 'ToggleGroup'
