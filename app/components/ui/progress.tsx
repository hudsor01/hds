'use client'

import { cn } from '@/app/lib/utils'
import type { LinearProgressProps } from '@mui/material'
import { LinearProgress as MuiLinearProgress, styled } from '@mui/material'
import * as React from 'react'

const StyledLinearProgress = styled(MuiLinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: theme.shape.borderRadius,
  [`&.MuiLinearProgress-root`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
  },
}))

export interface ProgressProps extends Omit<LinearProgressProps, 'value'> {
  value?: number
  max?: number
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const normalizedValue = (value / max) * 100

    return (
      <StyledLinearProgress
        ref={ref}
        variant="determinate"
        value={normalizedValue}
        className={cn('w-full', className)}
        {...props}
      />
    )
  }
)
Progress.displayName = 'Progress'
