'use client'

import { cn } from '@/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Home, Settings, Tool, Users } from 'react-feather'

const navigation = [
  { name: 'Dashboard', href: { pathname: '/dashboard' }, icon: Home },
  { name: 'Properties', href: { pathname: '/dashboard/properties' }, icon: Box },
  { name: 'Tenants', href: { pathname: '/dashboard/tenants' }, icon: Users },
  { name: 'Maintenance', href: { pathname: '/dashboard/maintenance' }, icon: Tool },
  { name: 'Settings', href: { pathname: '/dashboard/settings' }, icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-56 flex-col bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Property Manager</h2>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href.pathname
          return (
            <Link
              key={item.href.pathname}
              href={item.href}
              className={cn(
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
