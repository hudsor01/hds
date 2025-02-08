'use client';

import type { TooltipProps as MuiTooltipProps } from '@mui/material';
import { Tooltip as MuiTooltip, styled } from '@mui/material';
import * as React from 'react';

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
}));
export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;
export const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => <div ref={ref}>{children}</div>);

export const Tooltip = StyledTooltip;
