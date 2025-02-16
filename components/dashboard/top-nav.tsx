'use client'

import { UserNav } from '@/components/dashboard/user-nav'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { Breadcrumbs } from './breadcrumbs'

export function TopNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className={cn('hover:text-primary flex items-center text-lg font-semibold')}>
          <Building2 className="mr-2 h-6 w-6" />
          <span>HDS Platform</span>
        </Link>
        <div className="ml-4 flex-1">
          <Breadcrumbs />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}
