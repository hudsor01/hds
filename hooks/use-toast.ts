'use client'

import { useContext } from 'react'
import { ToastContext } from '@/components/toast'
import { Hooks } from '@/types'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export function useToast(): Hooks.UseToastReturn {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
