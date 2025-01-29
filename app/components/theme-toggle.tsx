'use client';

import { useTheme } from 'next-themes';
import * as feather from 'react-feather';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      variant='outline'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='w-9 h-9'
    >
      <span className='sr-only'>Toggle theme</span>
      <span
        dangerouslySetInnerHTML={{
          __html: feather.icons[theme === 'dark' ? 'sun' : 'moon'].toSvg({
            width: 16,
            height: 16,
            class: 'text-current',
          }),
        }}
      />
    </Button>
  );
}
