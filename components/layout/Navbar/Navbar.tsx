import { signOut, useSession } from 'next-auth/react';
import { Home, Link } from 'react-feather';
import {
  RequestCookie,
  ResponseCookie,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { usePathname } from 'next/navigation';
import { Route } from 'next/types';
import { Avatar } from '@mui/material';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/server';

const navigation: Array<{ name: string; href: Route }> = [
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

export default async function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const supabase = createClient({
    [Symbol.iterator]: function () {
      throw new Error('Function not implemented.');
    },
    size: 0,
    get: function (...args: [RequestCookie] | [name: string]): RequestCookie | undefined {
      throw new Error('Function not implemented.');
    },
    getAll: function (...args: [name: string] | [RequestCookie] | []): RequestCookie[] {
      throw new Error('Function not implemented.');
    },
    has: function (name: string): boolean {
      throw new Error('Function not implemented.');
    },
    set: function (
      ...args:
        | [key: string, value: string, cookie?: Partial<ResponseCookie> | undefined]
        | [options: ResponseCookie]
    ): ResponseCookies {
      throw new Error('Function not implemented.');
    },
    delete: function (
      ...args: [key: string] | [options: Omit<ResponseCookie, 'value' | 'expires'>]
    ): ResponseCookies {
      throw new Error('Function not implemented.');
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
                href='/signup'
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
