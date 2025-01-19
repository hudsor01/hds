'use client'

import type { AlertColor } from '@mui/material'
import { create } from 'zustand'

export type Toast = {
  id: string
  title?: string
  description?: string
  severity?: AlertColor
  action?: React.ReactNode
  duration?: number
}

type State = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToast = create<State>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Math.random().toString() }
      ]
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}))
