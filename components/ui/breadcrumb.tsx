'use client';

import {cn} from '@/lib/utils';
import type {BreadcrumbsProps as MuiBreadcrumbsProps} from '@mui/material';
import {Link, Breadcrumbs as MuiBreadcrumbs, styled, Typography} from '@mui/material';
import * as React from 'react';
import {ChevronRight} from 'react-feather';

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({theme}) => ({
  '& .MuiBreadcrumbs-separator': {
    margin: theme.spacing(0, 1),
  },
  '& .MuiBreadcrumbs-li': {
    display: 'flex',
    alignItems: 'center',
  },
}));

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: {
    href?: string;
    label: React.ReactNode;
  }[];
}

export const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({className, items, ...props}, ref) => (
    <StyledBreadcrumbs
      ref={ref}
      separator={<ChevronRight size={16} />}
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={index} variant='body2' className='text-foreground font-medium'>
              {item.label}
            </Typography>
          );
        }

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            underline='hover'
            color='inherit'
            className='hover:text-foreground'
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={index} variant='body2' color='inherit'>
            {item.label}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  ),
);
Breadcrumbs.displayName = 'Breadcrumbs';
