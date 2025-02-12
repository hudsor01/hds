'use client'

import type { ToastProps, ToastVariant } from '@/components/feedback/toast'
import { useCallback, useState } from 'react'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 6000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

interface UseToastReturn {
  toast: (props: Omit<ToastProps, 'open' | 'onClose'>) => void
  isOpen: boolean
  message: string
  variant: ToastVariant
  closeToast: () => void
}

const useToast = (): UseToastReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<ToastVariant>('default')

  const closeToast = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toast = useCallback(
    ({ message, variant = 'default' }: Omit<ToastProps, 'open' | 'onClose'>) => {
      setMessage(message)
      setVariant(variant)
      setIsOpen(true)

      const timeout = setTimeout(() => {
        closeToast()
      }, TOAST_REMOVE_DELAY)

      return () => clearTimeout(timeout)
    },
    [closeToast]
  )

  return {
    toast,
    isOpen,
    message,
    variant,
    closeToast
  }
}

export { useToast }
export type { UseToastReturn }
