// components/layout/shell.tsx
'use client';

import {useScrollTop} from '@/hooks/use-scroll';
import {cn} from '@/lib/utils';

// components/layout/shell.tsx

export function Shell({children}: {children: React.ReactNode}) {
  const scrolled = useScrollTop();

  return (
    <div className='h-screen flex dark:bg-slate-950'>
      {/* Compact navbar that collapses/transforms on scroll */}
      <nav
        className={cn(
          'fixed top-0 w-full h-14 px-4 border-b transition-all',
          scrolled ? 'border-border/40 bg-background/90 backdrop-blur-lg' : 'border-transparent',
        )}
      >
        <div className='flex h-14 items-center gap-4'>
          <Logo className='h-6 w-6' />
          {/* Collapsed menu appears on scroll */}
          {scrolled && <MainNav />}
        </div>
      </nav>

      {/* Slim sidebar with icons + tooltips */}
      <aside className='w-14 border-r bg-background/50 backdrop-blur-lg'>
        <SideNav />
      </aside>

      {/* Main content area with minimal padding */}
      <main className='flex-1 pt-14 overflow-auto'>{children}</main>
    </div>
  );
}
