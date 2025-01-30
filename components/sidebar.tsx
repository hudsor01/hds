'use client';

import { Bell, Box, Home, LogOut, Menu, Settings, Tool, Users, X } from 'react-feather';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../app/auth/lib/utils';

const mainNavItems = [
  {
    href: { pathname: '/dashboard' },
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: { pathname: '/dashboard/properties' },
    label: 'Properties',
    icon: Box,
  },
  {
    href: { pathname: '/dashboard/tenants' },
    label: 'Tenants',
    icon: Users,
  },
  {
    href: { pathname: '/dashboard/maintenance' },
    label: 'Maintenance',
    icon: Tool,
  },
  {
    href: { pathname: '/dashboard/analytics' },
    label: 'Analytics',
    icon: Settings,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button className='p-2 rounded-lg md:hidden' onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
              <Link href='/dashboard' className='flex md:mr-24'>
                <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-600'>
                  Hudson Digital
                </span>
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <button className='p-2 rounded-lg hover:bg-gray-100'>
                <Bell className='w-6 h-6 text-gray-500' />
              </button>
              <button className='flex items-center p-2 rounded-lg hover:bg-gray-100'>
                <LogOut className='w-6 h-6 text-gray-500' />
                <span className='ml-2'>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white'>
          <nav className='flex-1 space-y-1'>
            {mainNavItems.map(item => (
              <Link
                key={item.href.pathname}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800',
                  pathname === item.href.pathname ? 'bg-slate-100 dark:bg-slate-800' : '',
                )}
              >
                <item.icon className='w-4 h-4' />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className='border-t pt-4 mt-4'>
            <Link
              href='/dashboard/settings'
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                pathname === '/dashboard/settings' &&
                  'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
              )}
            >
              <Settings className='h-5 w-5' />
              Settings
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-gray-900/50 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
