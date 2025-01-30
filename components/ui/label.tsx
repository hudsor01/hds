'use client';

import * as React from 'react';
import type { FormLabelProps } from '@mui/material';
import { FormLabel as MuiFormLabel, styled } from '@mui/material';
import { cn } from '@/lib/utils';

const StyledLabel = styled(MuiFormLabel)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  '&.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));

export interface LabelProps extends FormLabelProps {
  htmlFor?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <StyledLabel
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = 'Label';
