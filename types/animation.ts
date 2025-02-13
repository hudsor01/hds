import type { DialogProps } from '@mui/material'

// Core animation types
export type AnimationType = 'fade' | 'slide' | 'modal'

export interface AnimationPreferences {
  reduceMotion: boolean
  duration: number
  setReduceMotion: (value: boolean) => void
  setDuration: (value: number) => void
}

export interface AnimationVariant {
  hidden: Record<string, any>
  visible: Record<string, any>
  exit?: Record<string, any>
}

export interface AnimationOptions {
  duration?: number
  delay?: number
  type?: 'spring' | 'tween'
  stiffness?: number
  damping?: number
}

// Toast types
export interface Toast {
  id: string
  title?: string
  description: string
  duration?: number
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
}

export interface ToastStore {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
}

// Modal types
export interface ModalConfig {
  id: string
  component: React.ReactNode
  props?: DialogProps
}

export interface ModalStore {
  modals: ModalConfig[]
  openModal: (modal: Omit<ModalConfig, 'id'>) => string
  closeModal: (id: string) => void
  clearModals: () => void
}
