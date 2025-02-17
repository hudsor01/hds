'use client'

import React, { useEffect } from 'react'
import { motion, useAnimationControls, type AnimationControls } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: number
  shimmerDuration?: number
  children: React.ReactNode
}

interface ShimmerStyle {
  background: string
  backgroundSize: string
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ children, className, shimmerColor = '#e0f0fe', shimmerSize = 0.05, shimmerDuration = 3, disabled, ...props }, ref) => {
    const controls: AnimationControls = useAnimationControls()

    useEffect(() => {
      const animateShimmer = async (): Promise<void> => {
        await controls.start({
          transition: { duration: 0 },
          backgroundPosition: '-100% 0'
        })
        await controls.start({
          backgroundPosition: ['-100% 0', '200% 0'],
          transition: {
            duration: shimmerDuration,
            repeat: Infinity,
            ease: 'linear'
          }
        })
      }

      if (!disabled) {
        void animateShimmer()
      }
    }, [controls, shimmerDuration, disabled])

    const getShimmerStyle = (color: string, size: number): ShimmerStyle => ({
      background: `linear-gradient(
      120deg,
      transparent ${size * 100}%,
      ${color} ${size * 100 * 2}%,
      transparent ${size * 100 * 3}%
    )`,
      backgroundSize: '300% 100%'
    })

    return (
      <button
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-xl px-6 py-3 font-medium',
          'transform transition-all duration-300',
          'bg-pastel-blue-600 text-white shadow-lg',
          !disabled && 'hover:scale-[1.02] hover:shadow-xl',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Animated shimmer layer */}
        {!disabled && (
          <motion.div
            animate={controls}
            className="pointer-events-none absolute inset-0"
            style={getShimmerStyle(shimmerColor, shimmerSize)}
          />
        )}

        {/* Hover overlay */}
        {!disabled && (
          <div
            className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10"
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

ShimmerButton.displayName = 'ShimmerButton'

// Export types
export type { ShimmerButtonProps }

// Utility function to create pre-configured shimmer buttons
export const createShimmerButton = (
  config: Partial<ShimmerButtonProps>
): React.ForwardRefExoticComponent<ShimmerButtonProps & React.RefAttributes<HTMLButtonElement>> => {
  const ConfiguredButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>((props, ref) => (
    <ShimmerButton {...config} {...props} ref={ref} />
  ))

  ConfiguredButton.displayName = 'ConfiguredShimmerButton'
  return ConfiguredButton
}
