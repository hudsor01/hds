'use client'

import { toast, type Toast as SonnerToast } from 'sonner'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

interface ToastOptions {
  title?: string
  description: string
  duration?: number
  type?: ToastType
}

class ToastError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ToastError'
  }
}

export function useToast() {
  const showToast = ({ title, description, duration = 5000, type = 'default' }: ToastOptions) => {
    try {
      if (!description) {
        throw new ToastError('Toast description is required')
      }

      if (type === 'default') {
        toast(description, { duration })
      } else {
        toast[type](description, {
          duration,
          ...(title && { description, title })
        })
      }
    } catch (error) {
      console.error('Toast error:', error)
      // Fallback to basic toast if something goes wrong
      toast.error('Something went wrong while showing notification')
    }
  }

  return { toast: showToast }
}
