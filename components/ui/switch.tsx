'use client'

import { cn } from '@/lib/utils'
import type { SwitchProps as MuiSwitchProps } from '@mui/material'
import { Switch as MuiSwitch, styled } from '@mui/material'
import * as React from 'react'

const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0
      }
    }
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    borderRadius: '50%',
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

export interface SwitchProps extends Omit<MuiSwitchProps, 'size'> {
  size?: 'default' | 'sm' | 'lg'
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <StyledSwitch
      ref={ref}
      className={cn(
        'shadow-xs focus-visible:outline-hidden focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'h-4 w-7',
        size === 'lg' && 'h-6 w-11',
        className
      )}
      {...props}
    />
  )
)
Switch.displayName = 'Switch'

export default Switch
