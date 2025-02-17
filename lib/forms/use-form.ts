import { useToast } from '@/hooks/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import { z } from 'zod'

interface UseFormOptions<T extends z.ZodObject<unknown>> {
  schema: T
  defaultValues?: Partial<z.infer<T>>
  onSubmit: (data: z.infer<T>) => Promise<void> | void
  onError?: (error: Error) => void
}

export function useForm<T extends z.ZodObject<unknown>>({ schema, defaultValues, onSubmit, onError }: UseFormOptions<T>) {
  const { showToast } = useToast()

  const form = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as unknown
  })

  const handleSubmit = useCallback(
    async (data: z.infer<T>) => {
      try {
        await onSubmit(data)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred'
        showToast(message, 'error')
        onError?.(error instanceof Error ? error : new Error(message))
      }
    },
    [onSubmit, onError, showToast]
  )

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleSubmit)
  }
}

// Form field utilities
export function getFieldError(fieldName: string, errors: Record<string, unknown>) {
  const error = errors[fieldName]
  return error?.message as string | undefined
}

export function isFieldRequired(schema: z.ZodObject<unknown>, fieldName: string): boolean {
  const shape = schema.shape as Record<string, z.ZodTypeunknown>
  const field = shape[fieldName]
  return !field.isOptional()
}

// Form validation utilities
export function validateField<T extends z.ZodObject<unknown>>(
  schema: T,
  fieldName: keyof z.infer<T>,
  value: unknown
): string | null {
  try {
    schema.shape[fieldName].parse(value)
    return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || 'Invalid value'
    }
    return 'Invalid value'
  }
}

// Form field props generator
export function createFormField<T extends z.ZodObject<unknown>>(schema: T) {
  return {
    getFieldProps: (name: keyof z.infer<T>) => ({
      name,
      required: isFieldRequired(schema, name as string),
      validate: (value: unknown) => validateField(schema, name, value)
    })
  }
}

// Form schema creator with type inference
export function createFormSchema<T extends Record<string, z.ZodTypeunknown>>(fields: T) {
  return z.object(fields)
}
