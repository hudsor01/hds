'use client'

import { Dialog } from '@mui/material'
import { ReactNode } from 'react'
import { ModalContext, useModalStore } from '@/hooks/use-modal'

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const modalStore = useModalStore()

  return (
    <ModalContext.Provider value={modalStore}>
      {children}
      {modalStore.modals.map(({ id, component, props }) => (
        <Dialog key={id} open={true} onClose={() => modalStore.closeModal(id)} {...props}>
          {component}
        </Dialog>
      ))}
    </ModalContext.Provider>
  )
}
