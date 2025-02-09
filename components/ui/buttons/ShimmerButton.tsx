'use client'

import { cn } from '@/lib/utils'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export const ShimmerButton = ({
  children,
  className,
  shimmerColor = '#e0f0fe',
  shimmerSize = 0.05,
  shimmerDuration = 3,
  ...props
}: React.ComponentProps<'button'> & {
  shimmerColor?: string
  shimmerSize?: number
  shimmerDuration?: number
}) => {
  const controls = useAnimationControls()

  useEffect(() => {
    const animateShimmer = async () => {
      await controls.start({
        transition: { duration: 0 },
        backgroundPosition: '-100% 0',
      })
      controls.start({
        backgroundPosition: ['-100% 0', '200% 0'],
        transition: {
          duration: shimmerDuration,
          repeat: Infinity,
          ease: 'linear',
        },
      })
    }
    animateShimmer()
  }, [controls, shimmerDuration])

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-xl px-6 py-3 font-medium',
        'transform transition-all duration-300 hover:scale-[1.02]',
        'bg-pastel-blue-600 text-white shadow-lg hover:shadow-xl',
        className
      )}
      {...props}
    >
      {/* Animated shimmer layer */}
      <motion.div
        animate={controls}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(
            120deg,
            transparent ${shimmerSize * 100}%,
            ${shimmerColor} ${shimmerSize * 100 * 2}%,
            transparent ${shimmerSize * 100 * 3}%
          )`,
          backgroundSize: '300% 100%',
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-10" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
