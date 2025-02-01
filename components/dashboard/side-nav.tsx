// components/dashboard/side-nav.tsx
'use client';

import
  {
    Cog6ToothIcon,
    HomeIcon
  } from '@heroicons/react/24/outline'

export function SideNav() {
  const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    // ... other main navigation items
  ];

  const bottomNavigation = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      description: 'Account settings and preferences'
    }
  ];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="flex flex-col h-full">
        {/* Main navigation items */}
        <div className="flex-1 px-4 space-y-1 py-4">
          {mainNavigation.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>

        {/* Settings navigation at bottom */}
        <div className="border-t border-gray-200 px-4 py-4">
          {bottomNavigation.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
}
