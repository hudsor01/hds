'use client'

import type { ComponentType } from 'react'
import { Suspense } from 'react'
import { LoadingSpinner } from './loading-spinner'
import { motion } from 'framer-motion'
import { fadeInOut } from '@/lib/animation-variants'

const MotionDiv = motion.div

export function withModalLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  return function WithLoadingModal(props: P) {
    return (
      <MotionDiv variants={fadeInOut} initial="hidden" animate="visible" exit="exit">
        <Suspense fallback={<LoadingSpinner />}>
          <WrappedComponent {...props} />
        </Suspense>
      </MotionDiv>
    )
  }
}
