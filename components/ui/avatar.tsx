'use client';

import {cn} from '@/lib/utils';
import type {AvatarProps as MuiAvatarProps} from '@mui/material';
import {Avatar as MuiAvatar, styled} from '@mui/material';
import * as React from 'react';

const StyledAvatar = styled(MuiAvatar)(({theme}) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&.MuiAvatar-colorDefault': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export interface AvatarProps extends MuiAvatarProps {
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({className, src, alt, children, fallback, ...props}, ref) => (
    <StyledAvatar
      ref={ref}
      src={src}
      alt={alt}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    >
      {!src && (fallback || children || alt?.charAt(0).toUpperCase())}
    </StyledAvatar>
  ),
);
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({className, alt, ...props}, ref) => (
  <img ref={ref} alt={alt} className={cn('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';
