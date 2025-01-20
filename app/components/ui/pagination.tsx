'use client'

import { cn } from '@/lib/utils'
import { Button } from '@mui/material'
import type { Route } from 'next'
import Link from 'next/link'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  children: React.ReactNode
  href: Route
  size?: 'small' | 'medium' | 'large'
}

const PaginationLink = ({
  className,
  isActive,
  size = 'medium',
  children,
  href,
  ...props
}: PaginationLinkProps) => {
  if (!children) {
    throw new Error('PaginationLink must have content')
  }
  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        component="a"
        variant={isActive ? 'contained' : 'outlined'}
        size={size}
        className={cn(
          'min-w-[2.25rem] px-3',
          isActive && 'pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </Link>
  )
}
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: Omit<PaginationLinkProps, 'children'>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="medium"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: Omit<PaginationLinkProps, 'children'>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="medium"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

export
{
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
