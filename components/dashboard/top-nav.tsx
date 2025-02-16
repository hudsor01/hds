'use client'

import { UserNav } from '@/components/dashboard/user-nav'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { cn } from '@/lib/utils'
import { Building2 } from 'lucide-react'

export function TopNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link 
          href="/dashboard"
          className={cn(
            "flex items-center font-semibold text-lg hover:text-primary"
          )}
        >
          <Building2 className="mr-2 h-6 w-6" />
          <span>HDS Platform</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}