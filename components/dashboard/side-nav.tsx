'use client';

import {cn} from '@/lib/utils';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Box, ChevronLeft, ChevronRight, FileText, Home, Settings, Users} from 'react-feather';

export function DashboardSideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {name: 'Dashboard', href: '/dashboard', icon: Home},
    {name: 'Properties', href: '/dashboard/properties', icon: Box},
    {name: 'Tenants', href: '/dashboard/tenants', icon: Users},
    {name: 'Documents', href: '/dashboard/documents', icon: FileText},
  ];

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300 z-50',
          isCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='p-4 hover:bg-accent transition-colors border-b'
          >
            {isCollapsed ? (
              <ChevronRight className='w-5 h-5' />
            ) : (
              <ChevronLeft className='w-5 h-5' />
            )}
          </button>

          {/* Main Navigation */}
          <nav className='flex-1 overflow-y-auto pb-20'>
            {' '}
            {/* Padding for settings section */}
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center p-4 mx-2 my-1 rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-accent text-foreground',
                )}
              >
                <item.icon className={cn('w-5 h-5', isCollapsed ? 'mx-auto' : 'mr-3')} />
                {!isCollapsed && <span className='text-sm font-medium'>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Fixed Settings Section */}
          <div className='absolute bottom-0 left-0 w-full border-t bg-background'>
            <Link
              href='/dashboard/settings'
              className={cn(
                'flex items-center p-4 mx-2 my-1 rounded-lg transition-colors',
                pathname === '/dashboard/settings'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-accent text-foreground',
              )}
            >
              <Settings className={cn('w-5 h-5', isCollapsed ? 'mx-auto' : 'mr-3')} />
              {!isCollapsed && <span className='text-sm font-medium'>Settings</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Responsive Content Area */}
      <main className={cn('transition-margin duration-300', isCollapsed ? 'ml-16' : 'ml-64')}>
        {/* Your dashboard content goes here */}
      </main>
    </>
  );
}
