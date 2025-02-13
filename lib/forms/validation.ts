import { z } from 'zod'
import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { DatabaseError, ValidationError } from '@/lib/supabase'

export function createFormSchema<T extends z.ZodType>(schema: T) {
  return schema
}

export function useZodForm<T extends z.ZodType>(
  schema: T,
  options: Omit<UseFormProps<z.infer<T>>, 'resolver'> = {}
) {
  const form = useForm<z.infer<T>>({
    ...options,
    resolver: zodResolver(schema)
  })

  return form
}

export async function handleFormError(error: unknown) {
  if (error instanceof ValidationError) {
    return {
      [error.code || 'root']: {
        type: 'manual',
        message: error.message
      }
    }
  }

  if (error instanceof DatabaseError) {
    return {
      root: {
        type: 'manual',
        message: error.message
      }
    }
  }

  if (error instanceof z.ZodError) {
    return error.formErrors.fieldErrors
  }

  console.error('Form submission error:', error)
  return {
    root: {
      type: 'manual',
      message: 'An unexpected error occurred. Please try again.'
    }
  }
}

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: T) => void | Promise<void>
  onError?: (error: Error) => void | Promise<void>
  successMessage?: string
  errorMessage?: string
}

export function useFormSubmit<T>(
  submitFn: (data: T) => Promise<void>,
  options: UseFormSubmitOptions<T> = {}
) {
  const { showToast } = useToast()

  return async (data: T) => {
    try {
      await submitFn(data)

      if (options.successMessage) {
        showToast({
          title: 'Success',
          description: options.successMessage,
          variant: 'default'
        })
      }

      await options.onSuccess?.(data)
    } catch (error) {
      const message =
        options.errorMessage ||
        (error instanceof Error ? error.message : 'An unexpected error occurred')

      showToast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      })

      if (error instanceof Error) {
        await options.onError?.(error)
      }

      throw error
    }
  }
}

export const commonValidators = {
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  url: z.string().url('Invalid URL'),
  positiveNumber: z.number().positive('Must be a positive number'),
  date: z.date().min(new Date(), 'Date must be in the future'),
  nonEmptyString: z.string().min(1, 'This field is required')
} as const
