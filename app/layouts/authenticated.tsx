'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Home, Menu as MenuIcon } from 'react-feather'

import { PreferencesMenu } from '../components/preferences-menu'
import { ThemeSwitcher } from '../components/theme-switcher'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Toaster } from '../components/ui/toaster'
import { usePerformance } from '../hooks/use-performance'
import { usePreferencesSync } from '../hooks/use-preferences-sync'
import { cn } from '../lib/utils'
import { routes } from '../routes'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: routes.dashboard, icon: Home },
  { name: 'Properties', href: routes.properties.index, icon: Home },
  { name: 'Tenants', href: routes.tenants.index, icon: Home },
  { name: 'Analytics', href: routes.dashboard + '/analytics', icon: Home },
  { name: 'Settings', href: routes.settings, icon: Home },
]

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const pathname = usePathname()
  usePerformance()
  usePreferencesSync()

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open Menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent position="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen">
        <nav className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-14 items-center border-b px-4">
            <Link href={routes.dashboard} className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span className="font-semibold">Property Manager</span>
            </Link>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeSwitcher />
              <PreferencesMenu />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      <Toaster />
    </>
  )
}
