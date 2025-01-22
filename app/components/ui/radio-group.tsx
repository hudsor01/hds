'use client'

import { cn } from '@/lib/utils'
import type { RadioGroupProps as MuiRadioGroupProps } from '@mui/material'
import {
  FormControl,
  FormControlLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  styled,
} from '@mui/material'
import * as React from 'react'

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  padding: theme.spacing(1),
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

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'defaultValue'> {
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, defaultValue, value, onChange, onValueChange, children, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, event.target.value)
        onValueChange?.(event.target.value)
      },
      [onChange, onValueChange]
    )

    return (
      <FormControl>
        <MuiRadioGroup
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          className={cn('grid gap-2', className)}
          {...props}
        >
          {children}
        </MuiRadioGroup>
      </FormControl>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps extends React.ComponentProps<typeof MuiRadio> {
  label?: React.ReactNode
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, label, ...props }, ref) => (
    <FormControlLabel
      control={
        <StyledRadio
          ref={ref}
          className={cn(
            'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      }
      label={label}
    />
  )
)
RadioGroupItem.displayName = 'RadioGroupItem'

export default RadioGroup
