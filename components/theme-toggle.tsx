'use client';

import { Button } from 'components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'react-feather';

import { useEffect, useState } from 'react';

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
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
