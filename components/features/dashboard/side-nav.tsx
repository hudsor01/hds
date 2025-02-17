'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
  {
    label: 'Overview',
    icon: Home,
    href: '/dashboard'
  },
  {
    label: 'Properties',
    icon: Building2,
    href: '/dashboard/properties'
  },
  {
    label: 'Leases',
    icon: FileText,
    href: '/dashboard/leases'
  },
  {
    label: 'Tenants',
    icon: Users2,
    href: '/dashboard/tenants'
  },
  {
    label: 'Maintenance',
    icon: Wrench,
    href: '/dashboard/maintenance'
  },
  {
    label: 'Documents',
    icon: FileBox,
    href: '/dashboard/documents'
  },
  {
    label: 'Messages',
    icon: Mail,
    href: '/dashboard/messages'
  },
  {
    label: 'Reports',
    icon: BarChart3,
    href: '/dashboard/reports'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings'
  }
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="bg-card flex h-full w-64 flex-col border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map(route => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground flex items-center rounded-lg px-3 py-2 text-sm font-medium',
                  pathname === route.href ? 'bg-accent text-accent-foreground' : 'transparent'
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
