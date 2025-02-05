'use client';

import {useTheme} from '@mui/material/styles';
import {useEffect} from 'react';

export function ThemeMetadata() {
  const theme = useTheme();

  useEffect(() => {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff');
    }
  }, [theme.palette.mode]);

  return null;
}
