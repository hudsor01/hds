'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { cn } from '@/lib/utils';

export interface AspectRatioProps extends React.ComponentProps<typeof Box> {
  ratio?: number;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, style, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn('relative w-full', className)}
      style={{
        aspectRatio: ratio,
        ...style,
      }}
      {...props}
    />
  ),
);
AspectRatio.displayName = 'AspectRatio';
