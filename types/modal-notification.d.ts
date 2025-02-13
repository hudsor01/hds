import { DialogProps } from '@mui/material'
import { ReactNode } from 'react'

declare global {
  interface Toast {
    id: string | number
    title?: string
    description: string
    duration?: number
    type?: 'success' | 'error' | 'warning' | 'info' | 'default'
  }

  interface ModalOptions {
    component: ReactNode
    props?: Omit<DialogProps, 'open' | 'onClose'>
  }

  interface AnimationConfig {
    duration?: number
    ease?: string | number[]
    delay?: number
  }

  interface ModalState {
    modals: Array<ModalData & { id: string }>
    openModal: (modal: ModalOptions) => string
    closeModal: (id: string) => void
    clearModals: () => void
  }

  interface ToastState {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string | number) => void
    clearToasts: () => void
  }
}
