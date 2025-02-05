'use client';

import {cn} from '@/lib/utils';
import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Route} from 'next/types';
import {Home} from 'react-feather';

const navigation: Array<{name: string; href: Route}> = [
  {name: 'About', href: '/about'},
  {name: 'Features', href: '/features'},
  {name: 'Pricing', href: '/pricing'},
  {name: 'Contact', href: '/contact'},
];

export default function Navbar() {
  const pathname = usePathname();

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
          <SignedOut>
            <SignInButton mode='modal'>
              <button className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href='/dashboard'
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            >
              Dashboard
            </Link>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                  userButtonPopoverCard: 'w-64',
                  userButtonPopoverActionButton: 'text-sm',
                  userButtonPopoverActionButtonText: 'text-sm',
                  userButtonPopoverFooter: 'hidden',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
