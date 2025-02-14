'use client'

import { toast } from 'sonner'

interface ToastProps {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info'
}

export function showToast({ title, message, type = 'info' }: ToastProps) {
  const styles = {
    className: 'group',
    style: {
      background: 'var(--color-background-ui)',
      border: '1px solid var(--color-border-ui)',
      color: 'var(--color-text-primary)',
    }
  }

  switch (type) {
    case 'success':
      toast.success(message, {
        ...styles,
        style: {
          ...styles.style,
          borderLeft: '4px solid var(--color-primary)'
        }
      })
      break
    case 'error':
      toast.error(message, {
        ...styles,
        style: {
          ...styles.style,
          borderLeft: '4px solid oklch(0.637 0.237 25.331)'  // Error color
        }
      })
      break
    default:
      toast(message, {
        ...styles,
        style: {
          ...styles.style,
          borderLeft: '4px solid oklch(0.637 0.237 205.331)'  // Info color
        }
      })
  }
}