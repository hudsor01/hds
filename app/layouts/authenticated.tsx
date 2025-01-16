'use client'

import { Home, Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { PreferencesMenu } from '@/components/preferences-menu'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/toaster'
import { usePerformance } from '@/hooks/use-performance'
import { usePreferencesSync } from '@/hooks/use-preferences-sync'

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Properties', href: '/properties', icon: null },
  { name: 'Tenants', href: '/tenants', icon: null },
  { name: 'Analytics', href: '/analytics', icon: null },
  { name: 'Settings', href: '/settings', icon: null },
]

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  usePerformance()
  usePreferencesSync()
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="absolute left-4 top-4">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-semibold">Property Manager</span>
          </div>
          <nav className="space-y-1 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                  pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-background lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-semibold">Property Manager</span>
        </div>
        <nav className="space-y-1 p-4">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <PreferencesMenu />
          </div>
        </div>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>

      <Toaster />
    </div>
  )
}
