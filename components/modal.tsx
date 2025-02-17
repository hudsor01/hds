'use client'

import {
  Dialog,
  DialogProps,
  useTheme,
  styled
} from '@mui/material'
import { ReactNode, createContext } from 'react'
import { useModalStore } from '@/hooks/use-modal'

interface ModalProviderProps {
  children: ReactNode
}

interface ModalConfig {
  id: string
  component: ReactNode
  props?: Omit<DialogProps, 'open' | 'onClose'>
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
  },
}))

export const ModalContext = createContext<ReturnType<typeof useModalStore> | null>(null)

export function ModalProvider({ children }: ModalProviderProps) {
  const modalStore = useModalStore()
  const theme = useTheme()

  return (
    <ModalContext.Provider value={modalStore}>
      {children}
      {modalStore.modals.map(({ id, component, props }: ModalConfig) => (
        <StyledDialog
          key={id}
          open={true}
          onClose={() => modalStore.closeModal(id)}
          maxWidth="sm"
          fullWidth
          {...props}
        >
          {component}
        </StyledDialog>
      ))}
    </ModalContext.Provider>
  )
}
