'use client'

import { toast as sonnerToast } from 'sonner'
import { useState, useCallback } from 'react'
import { Hooks, UI } from '@/types'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

interface Toast {
  id: string
  title?: string
  description: string
  duration?: number
  type?: ToastType
}

export function useToast(): Hooks.UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    ({ title, description, duration = 5000, type = 'default' }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9)
      const newToast = { id, title, description, duration, type }

      setToasts(current => [...current, newToast])

      if (type === 'default') {
        sonnerToast(description, { duration })
      } else {
        sonnerToast[type](description, {
          duration,
          ...(title && { description, title })
        })
      }

      return id
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  return {
    toasts,
    toast: addToast,
    removeToast
  }
}
