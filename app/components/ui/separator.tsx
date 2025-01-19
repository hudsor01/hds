'use client'

import { cn } from '@/lib/utils'
import type { DividerProps as MuiDividerProps } from '@mui/material'
import { Divider as MuiDivider, styled } from '@mui/material'
import * as React from 'react'

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '&.MuiDivider-vertical': {
    margin: theme.spacing(0, 1),
  },
}))

export type SeparatorProps = MuiDividerProps

export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <StyledDivider
      ref={ref}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = 'Separator'
