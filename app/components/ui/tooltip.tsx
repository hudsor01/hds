'use client'

import { cn } from '@/app/lib/utils'
import type { TooltipProps as MuiTooltipProps } from '@mui/material'
import { Tooltip as MuiTooltip, styled } from '@mui/material'
import * as React from 'react'

const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 1.5),
    fontSize: 12,
    border: `1px solid ${theme.palette.divider}`,
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.background.paper,
    '&:before': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}))

export interface TooltipProps {
  className?: string
  content: React.ReactNode
  children: React.ReactElement
  placement?: MuiTooltipProps['placement']
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, children, placement = 'top', ...props }, ref) => (
    <StyledTooltip
      ref={ref}
      title={<>{content}</>}
      arrow
      placement={placement}
      className={cn('', className)}
      {...props}
    >
      {children}
    </StyledTooltip>
  )
)
Tooltip.displayName = 'Tooltip'
