'use client';

import {cn} from '@/lib/utils';
import {Label} from 'components/ui/label';
import * as React from 'react';

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  required?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({className, label, children, helperText, errorText, required, ...props}, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label>
            {label}
            {required && <span className='text-destructive ml-1'>*</span>}
          </Label>
        )}
        {children}
        {helperText && <p className='text-sm text-muted-foreground'>{helperText}</p>}
        {errorText && <p className='text-sm text-destructive'>{errorText}</p>}
      </div>
    );
  },
);
Field.displayName = 'Field';
