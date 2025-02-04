import {useMediaQuery, useTheme} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';

// Mobile detection hook
export function useMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

// Scroll position hook
export function useScroll(threshold = 100) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return {scrolled, scrollToTop};
}

// Toast notifications hook
export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
  }>({
    message: '',
    type: 'info',
    open: false,
  });

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      setToast({message, type, open: true});
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast(prev => ({...prev, open: false}));
  }, []);

  return {toast, showToast, hideToast};
}

// User preferences hook
export function usePreferences() {
  const [preferences, setPreferences] = useState(() => {
    if (typeof window === 'undefined') return {};
    return JSON.parse(localStorage.getItem('user_preferences') || '{}');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = useCallback((key: string, value: unknown) => {
    setPreferences(prev => ({...prev, [key]: value}));
  }, []);

  return {preferences, updatePreference};
}
