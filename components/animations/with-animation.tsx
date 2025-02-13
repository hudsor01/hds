'use client'

import { ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/components/providers/animation-provider'
import { fadeInOut, slideInOut, scaleInOut } from '@/lib/animation-variants'

type AnimationType = 'fade' | 'slide' | 'scale'

interface WithAnimationProps {
  animationType?: AnimationType
  customVariants?: any
}

const variantsMap = {
  fade: fadeInOut,
  slide: slideInOut,
  scale: scaleInOut
}

export function withAnimation<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultType: AnimationType = 'fade'
) {
  return function WithAnimationComponent({
    animationType = defaultType,
    customVariants,
    ...props
  }: P & WithAnimationProps) {
    const { reduceMotion, duration } = useAnimation()

    const variants = customVariants || {
      ...variantsMap[animationType],
      visible: {
        ...variantsMap[animationType].visible,
        transition: {
          ...variantsMap[animationType].visible.transition,
          duration: reduceMotion ? 0 : duration
        }
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div initial="hidden" animate="visible" exit="exit" variants={variants}>
          <WrappedComponent {...(props as P)} />
        </motion.div>
      </AnimatePresence>
    )
  }
}
