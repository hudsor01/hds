'use client'

import { create } from 'zustand'

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  visible?: boolean
  duration?: number
}

type State = {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id' | 'visible'>) => void
}

const useToast = create<State>((set) => ({
  toasts: [],
  toast: (toast) => set((state) => ({
    toasts: [
      ...state.toasts,
      { ...toast, id: Math.random().toString(), visible: true }
    ]
  }))
}))

export { useToast }
