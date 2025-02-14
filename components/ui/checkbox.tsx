'use client'

import { cn } from '@/lib/utils'
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material'
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import * as React from 'react'

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
      <MuiCheckbox
        ref={ref}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={handleChange}
        className={cn(
          'border-primary focus-visible:ring-ring h-4 w-4 rounded-sm border shadow-sm focus:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
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
