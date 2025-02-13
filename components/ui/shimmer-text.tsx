'use client'

import { cn } from '../../lib/utils'
import React, { CSSProperties, FC, ReactNode } from 'react'

interface AnimatedShinyTextProps {
  children: ReactNode
  className?: string
  shimmerWidth?: number
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 200
}) => {
  return (
    <p
      style={
        {
          '--shimmer-width': `${shimmerWidth}px`
        } as CSSProperties
      }
      className={cn(
        'mx-auto max-w-md text-yellow-100/45',

        // Shimmer effect
        'animate-shimmer [background-size:var(--shimmer-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',

        // Shimmer gradient
        'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-yellow-300',

        className
      )}
    >
      {children}
    </p>
  )
}

export default AnimatedShinyText
