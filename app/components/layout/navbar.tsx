'use client';

import { signOut, useSession } from 'next-auth/react';
import { Home } from 'react-feather';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar } from '@mui/material';

import { cn } from '@/lib/utils';

const navigation: Array<{ name: string; href: Route }> = [
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60'>
      <div className='container flex h-14 items-center justify-between'>
        <Link href='/' className='ml-4 flex items-center space-x-2'>
          <Home size={24} className='text-current' />
          <span className='hidden font-bold sm:inline-block'>HDS</span>
        </Link>

        <nav className='flex-1 flex items-center justify-center space-x-2'>
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

        <div className='flex items-center space-x-4 mr-4'>
          {session ? (
            // User is signed in
            <div className='flex items-center space-x-2'>
              <Avatar
                alt={session?.user?.name || 'User'}
                src={session?.user?.image}
                onClick={() => {
                  /* handle avatar click for profile/settings */
                }}
                sx={{ cursor: 'pointer' }}
              />
              <button
                onClick={() => signOut()}
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                Sign Out
              </button>
            </div>
          ) : (
            // User is not signed in
            <>
              <Link
                href='/login'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                Sign In
              </Link>
              <Link
                href='/register'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
