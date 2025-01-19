'use client'

import { create } from 'zustand'

export type Toast = {
  id: string
  title?: string
  description: string
  severity?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

type ToastStore = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Math.random().toString(36).substring(2, 9),
          ...toast,
        },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}))
