import { cn } from '@/app/lib/utils'
import {
    BuildingOffice2Icon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: { pathname: '/dashboard' }, icon: HomeIcon },
  { name: 'Properties', href: { pathname: '/dashboard/properties' }, icon: BuildingOffice2Icon },
  { name: 'Tenants', href: { pathname: '/dashboard/tenants' }, icon: UsersIcon },
  { name: 'Documents', href: { pathname: '/dashboard/documents' }, icon: DocumentTextIcon },
  { name: 'Finances', href: { pathname: '/dashboard/finances' }, icon: CurrencyDollarIcon },
  { name: 'Settings', href: { pathname: '/dashboard/settings' }, icon: Cog6ToothIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-sm">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href.pathname
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0'
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
