'use client';

import {Collapse, styled} from '@mui/material';
import * as React from 'react';

const StyledCollapse = styled(Collapse)(({theme}) => ({
  '& .MuiCollapse-wrapper': {
    borderRadius: theme.shape.borderRadius,
  },
}));

export interface CollapsibleProps extends React.ComponentProps<typeof Collapse> {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({className, defaultOpen, onOpenChange, children, ...props}, ref) => {
    const [open] = React.useState(defaultOpen || false);

    React.useEffect(() => {
      onOpenChange?.(open);
    }, [open, onOpenChange]);

    return (
      <StyledCollapse ref={ref} in={open} className={className} {...props}>
        {children}
      </StyledCollapse>
    );
  },
);
Collapsible.displayName = 'Collapsible';

export interface CollapsibleTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({className, asChild, ...props}, ref) => {
    const Component = asChild ? 'span' : 'button';
    return <Component ref={ref} className={className} {...props} />;
  },
);
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, children, ...props}, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  ),
);
CollapsibleContent.displayName = 'CollapsibleContent';

export {Collapsible, CollapsibleContent, CollapsibleTrigger};
