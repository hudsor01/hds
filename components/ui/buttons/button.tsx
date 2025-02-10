'use client';

import { cn } from '@/lib/utils';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type VariantProps, cva } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-block rounded px-8 py-3 text-sm font-medium transition focus:ring-3 focus:outline-hidden',
  {
    variants: {
      variant: {
        default: 'bg-blue-200 text-gray-800 hover:scale-110 hover:rotate-2 active:bg-blue-300',
        outline:
          'border border-current text-blue-400 hover:scale-110 hover:rotate-2 active:text-blue-500',
        'default-left':
          'bg-blue-200 text-gray-800 hover:scale-110 hover:-rotate-2 active:bg-blue-300',
        'outline-left':
          'border border-current text-blue-400 hover:scale-110 hover:-rotate-2 active:text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

export interface LoadingButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <MuiButton {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  );
}
