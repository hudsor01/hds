'use client';

import { Home } from 'react-feather';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navigation: Array<{ name: string; href: Route }> = [
  { name: 'About', href: '/about' as Route },
  { name: 'Features', href: '/features' as Route },
  { name: 'Pricing', href: '/pricing' as Route },
  { name: 'Contact', href: '/contact' as Route },
];

interface NavbarProps {
  children?: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6 flex items-center space-x-2'>
          <Home size={24} className='text-current' />
          <span className='hidden font-bold sm:inline-block'>HDS</span>
        </Link>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          {children}
          <nav className='flex items-center'>
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
