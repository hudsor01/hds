'use client'

import { Toast } from '@/components/ui/toast'
import type { Toast as ToastType } from '@/hooks/use-toast'
import { useToast } from '@/hooks/use-toast'

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <>
      {toasts.map((toast: ToastType) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  )
}
