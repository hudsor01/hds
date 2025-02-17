'use client'

import { Skeleton as MuiSkeleton, useTheme, type SkeletonProps as MuiSkeletonProps, type Theme } from '@mui/material'
import React from 'react'

interface SkeletonProps extends Omit<MuiSkeletonProps, 'animation' | 'variant'> {
  animation?: 'pulse' | 'wave' | false
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular'
}

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = 'rounded', animation = 'pulse', sx, ...props }, ref) => {
    const theme = useTheme()

    const getBackgroundColor = (theme: Theme): string =>
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'

    const getWaveColor = (theme: Theme): string =>
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'

    return (
      <MuiSkeleton
        ref={ref}
        variant={variant}
        animation={animation}
        sx={{
          backgroundColor: getBackgroundColor(theme),
          '&::after':
            animation === 'wave'
              ? {
                  background: `linear-gradient(90deg, transparent, ${getWaveColor(theme)}, transparent)`
                }
              : undefined,
          ...sx
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Export types for better DX
export type { SkeletonProps }

interface CreateSkeletonOptions extends Partial<SkeletonProps> {
  count: number
}

// Type-safe utility function to create skeleton lists
export const createSkeletonList = (options: CreateSkeletonOptions): React.ReactElement[] =>
  Array.from({ length: options.count }, (_, index) => <Skeleton key={index} {...options} />)

// Type-safe utility function to create custom skeleton configurations
export const createSkeletonConfig = (
  defaultProps: Partial<SkeletonProps>
): React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLSpanElement>> => {
  const CustomSkeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>((props, ref) => (
    <Skeleton {...defaultProps} {...props} ref={ref} />
  ))

  CustomSkeleton.displayName = 'CustomSkeleton'
  return CustomSkeleton
}
