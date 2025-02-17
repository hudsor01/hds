'use client'

import React, { useCallback, useEffect, ComponentType } from 'react'
import { useModalStore } from '@/hooks/use-modal'
import { Dialog, DialogProps, Backdrop, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import type { ModalConfig } from '@/types/animation'

const MotionDialog = motion(Dialog)

interface ModalWrapperProps extends DialogProps {
  children: React.ReactNode
  onClose: () => void
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose, ...props }) => {
  const theme = useTheme()

  return (
    <MotionDialog
      open
      onClose={onClose}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut'
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`
        }
      }}
      {...props}
    >
      {children}
    </MotionDialog>
  )
}

export function ModalProvider(): React.ReactElement {
  const modals = useModalStore(state => state.modals)
  const closeModal = useModalStore(state => state.closeModal)

  // Handle escape key for the topmost modal
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modals.length > 0) {
        closeModal(modals[modals.length - 1].id)
      }
    },
    [modals, closeModal]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  // Add aria-hidden to background content when modal is open
  useEffect(() => {
    const mainContent = document.querySelector('main')
    if (mainContent && modals.length > 0) {
      mainContent.setAttribute('aria-hidden', 'true')
      return () => {
        mainContent.removeAttribute('aria-hidden')
      }
    }
  }, [modals.length])

  return (
    <AnimatePresence>
      {modals.map((modal, index) => {
        const Component = modal.component as unknown as ComponentType<any>
        const isTopmost = index === modals.length - 1

        return (
          <ModalWrapper
            key={modal.id}
            onClose={() => closeModal(modal.id)}
            // Stack modals with increasing z-index
            style={{ zIndex: 1300 + index }}
            // Only allow interaction with the topmost modal
            aria-hidden={!isTopmost}
            // Backdrop for each modal
            BackdropComponent={Backdrop}
            BackdropProps={{
              transitionDuration: 200,
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                // Stack backdrops with proper z-index
                zIndex: -1
              }
            }}
          >
            <Component onClose={() => closeModal(modal.id)} {...modal.props} />
          </ModalWrapper>
        )
      })}
    </AnimatePresence>
  )
}

// Export types for use in components
export interface ModalComponentProps {
  onClose: () => void
  [key: string]: any
}
