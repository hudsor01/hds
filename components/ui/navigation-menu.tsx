'use client'

import { cn } from '@/auth/lib/utils'
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material'
import type { Route } from 'next'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import * as React from 'react'

interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{
    title: string
    href: Route
    description?: string
    icon?: React.ReactNode
  }>
}

interface MenuItemLinkProps extends LinkProps<string> {
  className?: string
  children?: React.ReactNode
}

const MenuItemLink = React.forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
  ({ href, className, children, ...props }, ref) => (
    <Link ref={ref} href={href} className={className} {...props}>
      {children}
    </Link>
  )
)
MenuItemLink.displayName = 'MenuItemLink'

export function NavigationMenu({ className, items, ...props }: NavigationMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <nav className={cn('relative z-10', className)} {...props}>
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
      >
        Menu
      </button>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 no-underline"
            onClick={handleClose}
          >
            <MuiMenuItem className="w-full">
              {item.icon}
              <div>
                <div className="text-sm font-medium">{item.title}</div>
                {item.description && (
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </MuiMenuItem>
          </Link>
        ))}
      </MuiMenu>
    </nav>
  )
}

export default NavigationMenu
