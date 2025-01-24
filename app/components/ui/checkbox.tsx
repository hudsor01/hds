'use client'

import { cn } from '@/auth/lib/utils'
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material'
import {
    FormControlLabel,
    Checkbox as MuiCheckbox,
    styled,
} from '@mui/material'
import * as React from 'react'

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'defaultChecked'> {
  label?: React.ReactNode
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, defaultChecked, checked, onChange, onCheckedChange, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, event.target.checked)
        onCheckedChange?.(event.target.checked)
      },
      [onChange, onCheckedChange]
    )

    const checkbox = (
      <StyledCheckbox
        ref={ref}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={handleChange}
        className={cn(
          'h-4 w-4 rounded-sm border border-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )

    if (label) {
      return <FormControlLabel control={checkbox} label={label} />
    }

    return checkbox
  }
)
Checkbox.displayName = 'Checkbox'
