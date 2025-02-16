'use client'

import { type ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/components/animation-provider'
import { fadeInOut, slideDown, modalVariants } from '@/lib/animation-variants'

type AnimationType = 'fade' | 'slide' | 'modal'

interface WithAnimationProps {
  animationType?: AnimationType
  customVariants?: any
  onAnimationComplete?: () => void
}

const variantsMap = {
  fade: fadeInOut,
  slide: slideDown,
  modal: modalVariants
}

export function withAnimation<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultType: AnimationType = 'fade'
) {
  return function WithAnimationComponent({
    animationType = defaultType,
    customVariants,
    onAnimationComplete,
    ...props
  }: P & WithAnimationProps) {
    const { reduceMotion, duration } = useAnimation()

    const variants = customVariants || {
      ...variantsMap[animationType],
      visible: {
        ...variantsMap[animationType].visible,
        transition: {
          ...(variantsMap[animationType].visible?.transition || {}),
          duration: reduceMotion ? 0 : duration
        }
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          onAnimationComplete={onAnimationComplete}
        >
          <WrappedComponent {...(props as P)} />
        </motion.div>
      </AnimatePresence>
    )
  }
}
