'use client'

import { Dialog } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef } from 'react'
import { ModalData } from '@/hooks/use-modal'
import { ModalErrorBoundary } from './modal-error-boundary'
import { modalVariants, overlayVariants } from '@/lib/animation-variants'
import { useAnimation } from '@/components/providers/animation-provider'

const MotionDialog = motion(Dialog)

interface AnimatedModalProps extends Omit<ModalData, 'id'> {
  open: boolean
  onClose: () => void
  modalId: string
}

export const AnimatedModal = forwardRef<HTMLDivElement, AnimatedModalProps>(
  ({ component, props, open, onClose, modalId }, ref) => {
    const { reduceMotion, duration } = useAnimation()

    const animatedVariants = {
      ...modalVariants,
      visible: {
        ...modalVariants.visible,
        transition: {
          ...modalVariants.visible.transition,
          duration: reduceMotion ? 0 : duration
        }
      }
    }

    const overlayAnimatedVariants = {
      ...overlayVariants,
      visible: {
        ...overlayVariants.visible,
        transition: { duration: reduceMotion ? 0 : duration }
      }
    }

    return (
      <AnimatePresence mode="wait">
        {open && (
          <MotionDialog
            ref={ref}
            open={open}
            onClose={onClose}
            {...props}
            componentsProps={{
              backdrop: {
                ...props?.componentsProps?.backdrop,
                as: motion.div,
                initial: 'hidden',
                animate: 'visible',
                exit: 'exit',
                variants: overlayAnimatedVariants
              }
            }}
            PaperProps={{
              ...props?.PaperProps,
              component: motion.div,
              initial: 'hidden',
              animate: 'visible',
              exit: 'exit',
              variants: animatedVariants
            }}
          >
            <ModalErrorBoundary modalId={modalId}>{component}</ModalErrorBoundary>
          </MotionDialog>
        )}
      </AnimatePresence>
    )
  }
)

AnimatedModal.displayName = 'AnimatedModal'
