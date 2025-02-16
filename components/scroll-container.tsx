'use client'

import { Box, type BoxProps } from '@mui/material'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { useAnimation } from '@/components/animation-provider'

const MotionBox = motion(Box) as typeof motion.div

interface ScrollContainerProps extends BoxProps {
  animate?: boolean
}

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ children, animate = true, ...props }, ref) => {
    const { reduceMotion } = useAnimation()

    // Disable animations if reduceMotion is true or animate prop is false
    if (reduceMotion || !animate) {
      return (
        <Box
          ref={ref}
          {...props}
          sx={{
            height: '100%',
            overflowY: 'auto',
            ...props.sx
          }}
        >
          {children}
        </Box>
      )
    }

    return (
      <MotionBox
        ref={ref}
        {...props}
        sx={{
          height: '100%',
          overflowY: 'auto',
          ...props.sx
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </MotionBox>
    )
  }
)

ScrollContainer.displayName = 'ScrollContainer'
