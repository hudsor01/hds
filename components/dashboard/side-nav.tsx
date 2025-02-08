'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Settings,
  Users,
} from 'react-feather';

export function DashboardSideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Properties', href: '/dashboard/properties', icon: Box },
    { name: 'Tenants', href: '/dashboard/tenants', icon: Users },
    { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  ];

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen border-r bg-background transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div className="flex h-full flex-col">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="border-b p-4 transition-colors hover:bg-accent"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto pb-20">
            {' '}
            {/* Padding for settings section */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'mx-2 my-1 flex items-center rounded-lg p-4 transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent',
                )}
              >
                <item.icon
                  className={cn('h-5 w-5', isCollapsed ? 'mx-auto' : 'mr-3')}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Fixed Settings Section */}
          <div className="absolute bottom-0 left-0 w-full border-t bg-background">
            <Link
              href="/dashboard/settings"
              className={cn(
                'mx-2 my-1 flex items-center rounded-lg p-4 transition-colors',
                pathname === '/dashboard/settings'
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-accent',
              )}
            >
              <Settings
                className={cn('h-5 w-5', isCollapsed ? 'mx-auto' : 'mr-3')}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">Settings</span>
              )}
            </Link>
          </div>
        </div>
      </aside>

      {/* Responsive Content Area */}
      <main
        className={cn(
          'transition-margin duration-300',
          isCollapsed ? 'ml-16' : 'ml-64',
        )}
      >
        {/* Your dashboard content goes here */}
      </main>
    </>
  );
}
