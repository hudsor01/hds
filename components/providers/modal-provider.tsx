'use client'

import React, { useCallback, useEffect, ComponentType, FC } from 'react'
import { useModalStore } from '@/hooks/use-modal'
import { AnimatePresence } from 'framer-motion'
import type { ModalConfig } from '@/types/animation'

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
      {modals.map(modal => {
        const Component = modal.component as unknown as ComponentType<any>
        return <Component key={modal.id} onClose={() => closeModal(modal.id)} {...modal.props} />
      })}
    </AnimatePresence>
  )
}
