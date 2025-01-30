'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputElementProps {
  children: React.ReactNode;
  className?: string;
}

const InputLeftElement = React.forwardRef<HTMLDivElement, InputElementProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
        className,
      )}
    >
      {children}
    </div>
  ),
);
InputLeftElement.displayName = 'InputLeftElement';

const InputRightElement = React.forwardRef<HTMLDivElement, InputElementProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('absolute inset-y-0 right-0 flex items-center pr-3', className)}>
      {children}
    </div>
  ),
);
InputRightElement.displayName = 'InputRightElement';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative w-full', className)} {...props}>
      {children}
    </div>
  ),
);
InputGroup.displayName = 'InputGroup';

export { InputGroup, InputLeftElement, InputRightElement };
