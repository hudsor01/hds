'use client';

import { Button } from 'components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'components/ui/command';
import * as feather from 'react-feather';

import { useEffect, useState } from 'react';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

const navigationItems = [
  { label: 'Home', icon: 'home', href: '/' as Route },
  { label: 'Dashboard', icon: 'layout', href: '/dashboard' as Route },
  { label: 'Properties', icon: 'home', href: '/properties' as Route },
  { label: 'Tenants', icon: 'users', href: '/tenants' as Route },
  { label: 'Maintenance', icon: 'tool', href: '/maintenance' as Route },
  { label: 'Settings', icon: 'settings', href: '/settings' as Route },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant='outline'
        className='hidden md:flex gap-2 text-sm text-muted-foreground'
        onClick={() => setOpen(true)}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: feather.icons.search.toSvg({
              width: 16,
              height: 16,
              class: 'text-current',
            }),
          }}
        />
        <span>Search...</span>
        <kbd className='pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Navigation'>
            {navigationItems.map(item => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  router.push(item.href);
                  setOpen(false);
                }}
              >
                <span
                  className='mr-2'
                  dangerouslySetInnerHTML={{
                    __html: feather.icons[item.icon].toSvg({
                      width: 16,
                      height: 16,
                      class: 'text-current',
                    }),
                  }}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
