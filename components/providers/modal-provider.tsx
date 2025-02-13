'use client'

import { Dialog } from '@mui/material'
import { useModalStore } from '@/hooks/use-modal'
import { AnimatedModal } from './animated-modal'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect } from 'react'

export function ModalProvider() {
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
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Add aria-hidden to background content when modal is open
  useEffect(() => {
    const mainContent = document.querySelector('main')
    if (mainContent && modals.length > 0) {
      mainContent.setAttribute('aria-hidden', 'true')
      return () => mainContent.removeAttribute('aria-hidden')
    }
  }, [modals.length])

  return (
    <AnimatePresence mode="wait">
      {modals.map(({ id, component, props }, index) => {
        const isTopmost = index === modals.length - 1
        return (
          <AnimatedModal
            key={id}
            modalId={id}
            component={component}
            props={{
              ...props,
              // Only allow interaction with the topmost modal
              style: {
                ...props?.style,
                pointerEvents: isTopmost ? 'auto' : 'none',
                zIndex: 1300 + index
              }
            }}
            open={true}
            onClose={() => isTopmost && closeModal(id)}
          />
        )
      })}
    </AnimatePresence>
  )
}
