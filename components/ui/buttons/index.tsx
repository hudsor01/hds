import { useScroll } from '@/hooks/ui';
import { ArrowUpward } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { useEffect, useState } from 'react';

// Back to Top Button
export function BackToTopButton() {
  const { scrolled, scrollToTop } = useScroll(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        opacity: scrolled ? 1 : 0,
        transform: `translateY(${scrolled ? 0 : 20}px)`,
        transition: 'all 0.2s',
      }}
    >
      <ArrowUpward />
    </Button>
  );
}

// Submit Button
interface SubmitButtonProps extends ButtonProps {
  loading?: boolean;
}

export function SubmitButton({
  loading,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? 'Submitting...' : children}
    </Button>
  );
}

// Theme Toggle Button
interface ThemeToggleProps extends ButtonProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggleButton({
  theme,
  onToggle,
  ...props
}: ThemeToggleProps) {
  return (
    <Button onClick={onToggle} {...props}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}
