// components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {ChevronLeft, ChevronRight, Folder, Home, Users} from 'react-feather';

// components/layout/sidebar.tsx

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const mainNavigation = [
    {name: 'Dashboard', href: '/dashboard', icon: Home},
    {name: 'Properties', href: '/dashboard/properties', icon: Home},
    {name: 'Tenants', href: '/dashboard/tenants', icon: Users},
    {name: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench},
    {name: 'Financials', href: '/dashboard/financials', icon: ChartBar},
    {name: 'Documents', href: '/dashboard/documents', icon: Folder},
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-width duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo and Toggle Section */}
          <div className='h-16 flex items-center justify-between px-4 border-b border-gray-200'>
            {!isCollapsed && <span className='text-xl font-semibold'>PMS</span>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors
                ${isCollapsed ? 'mx-auto' : ''}`}
            >
              {isCollapsed ? (
                <ChevronRight className='h-5 w-5' />
              ) : (
                <ChevronLeft className='h-5 w-5' />
              )}
            </button>
          </div>

          {/* Main Navigation */}
          <nav className='flex-1 px-3 py-4'>
            <div className='space-y-1'>
              {mainNavigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 rounded-lg transition-colors
                    ${
                      pathname === item.href
                        ? 'bg-pastel-blue-50 text-pastel-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className='h-5 w-5 flex-shrink-0' />
                  {!isCollapsed && <span className='ml-3 text-sm font-medium'>{item.name}</span>}
                </Link>
              ))}
            </div>
          </nav>

          {/* Settings Section - Fixed at Bottom */}
          <div className='border-t border-gray-200 p-3'>
            <Link
              href='/settings'
              className={`flex items-center px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors
                ${pathname === '/settings' ? 'bg-gray-100' : ''}
                ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Wrench className='h-5 w-5 flex-shrink-0' />
              {!isCollapsed && <span className='ml-3 text-sm font-medium'>Settings</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main
        className={`min-h-screen bg-gray-50 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'ml-16' : 'ml-64'}`}
      >
        {/* Your dashboard content goes here */}
      </main>
    </>
  );
}
