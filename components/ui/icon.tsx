'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ 
  name, 
  size = 24, 
  strokeWidth = 2, 
  className, 
  ...props 
}: IconProps) {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function loadIcon() {
      try {
        const icon = await import(`@heroicons/react/24/outline/${name}.js`);
        if (iconRef.current) {
          iconRef.current.innerHTML = icon.default;
        }
      } catch (error) {
        console.error(`Failed to load icon: ${name}`, error);
      }
    }

    void loadIcon();
  }, [name]);

  return (
    <span
      ref={iconRef}
      className={cn('inline-block', className)}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}
