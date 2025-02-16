import { useState } from 'react'

export interface FormState<T> {
  data: T
  isSubmitting: boolean
  error: string | null
}

export function useFormState<T>(initialData: T) {
  const [state, setState] = useState<FormState<T>>({
    data: initialData,
    isSubmitting: false,
    error: null
  })

  const setFormData = (data: Partial<T>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...data }
    }))
  }

  const startSubmitting = () => {
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null
    }))
  }

  const setError = (error: string) => {
    setState(prev => ({
      ...prev,
      isSubmitting: false,
      error
    }))
  }

  const endSubmitting = () => {
    setState(prev => ({
      ...prev,
      isSubmitting: false
    }))
  }

  return {
    state,
    setFormData,
    startSubmitting,
    setError,
    endSubmitting
  }
}
