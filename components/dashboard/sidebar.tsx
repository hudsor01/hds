'use client'

import type { routes } from '../../app/routes'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, DollarSign, FileText, Home, Settings, Tool, Users } from 'react-feather'

const navigation = [
  { name: 'Dashboard', href: routes.dashboard, icon: Home },
  { name: 'Properties', href: routes.properties.index, icon: Box },
  { name: 'Tenants', href: routes.tenants.index, icon: Users },
  { name: 'Documents', href: routes.documents.index, icon: FileText },
  { name: 'Finances', href: routes.finances.index, icon: DollarSign },
  { name: 'Maintenance', href: routes.maintenance.index, icon: Tool },
  { name: 'Settings', href: routes.settings, icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="shadow-xs flex h-full w-64 flex-col bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
