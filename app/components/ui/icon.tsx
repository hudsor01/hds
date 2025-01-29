'use client';

import Icon from 'react-feather'

import { HTMLAttributes, useEffect, useRef } from 'react'

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, strokeWidth = 2, className, ...props }: IconProps) {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (iconRef.current && name in Icon.icons) {
      iconRef.current.innerHTML = Icon.icons[name].toSvg({
        width: size,
        height: size,
        'stroke-width': strokeWidth,
      });
    }
  }, [name, size, strokeWidth]);

  return <span ref={iconRef} className={className} {...props} />;
}
