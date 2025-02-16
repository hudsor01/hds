'use client'

import { useForm } from '@/lib/forms/use-form'
import { type FieldValues, type FormProvider as RHFFormProvider, type UseFormReturn } from 'react-hook-form'
import { type z } from 'zod'

// Define error types
export interface FormError {
  type: string
  message: string
  field?: string
}

// Define validation options
export interface ValidationOptions {
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
  reValidateMode?: 'onBlur' | 'onChange' | 'onSubmit'
  shouldUnregister?: boolean
  shouldFocusError?: boolean
}

// Define form submission state
export interface FormSubmissionState {
  isSubmitting: boolean
  isSubmitted: boolean
  isSubmitSuccessful: boolean
  submitCount: number
}

// Define base form container props
interface BaseFormContainerProps<T extends FieldValues> {
  children: React.ReactNode
  defaultValues?: Partial<T>
  onSubmit: (data: T) => Promise<void> | void
  onError?: (error: FormError | Error) => void
  className?: string
  validationOptions?: ValidationOptions
  resetOnSubmit?: boolean
  id?: string
}

// Define typed form container props
export interface FormContainerProps<T extends z.ZodObject<any>> 
  extends BaseFormContainerProps<z.infer<T>> {
  schema: T
}

export function FormContainer<T extends z.ZodObject<any>>({
  children,
  schema,
  defaultValues,
  onSubmit,
  onError,
  className,
  validationOptions,
  resetOnSubmit = false,
  id
}: FormContainerProps<T>): JSX.Element {
  // Generate unique form ID
  const formId = id || `form-${Math.random().toString(36).substr(2, 9)}`

  // Initialize form methods with provided options
  const methods = useForm({
    schema,
    defaultValues: defaultValues as z.infer<T>,
    mode: validationOptions?.mode || 'onBlur',
    reValidateMode: validationOptions?.reValidateMode || 'onChange',
    shouldUnregister: validationOptions?.shouldUnregister,
    shouldFocusError: validationOptions?.shouldFocusError ?? true,
  })

  // Handle successful form submission
  const handleSubmit = async (data: z.infer<T>): Promise<void> => {
    try {
      await onSubmit(data)
      if (resetOnSubmit) {
        methods.reset(defaultValues as z.infer<T>)
      }
    } catch (error) {
      // Handle form submission errors
      const formError: FormError = {
        type: 'submit',
        message: error instanceof Error ? error.message : 'Form submission failed',
      }
      
      onError?.(formError)
      
      // Set form-level error
      methods.setError('root.serverError', {
        type: 'server',
        message: formError.message
      })
    }
  }

  return (
    <RHFFormProvider {...(methods as UseFormReturn)}>
      <form
        id={formId}
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={className}
        noValidate // Disable browser validation in favor of our schema
      >
        {/* Display form-level errors if any */}
        {methods.formState.errors.root?.serverError && (
          <div
            role="alert"
            className="mb-4 text-sm text-destructive"
          >
            {methods.formState.errors.root.serverError.message}
          </div>
        )}
        
        {children}
      </form>
    </RHFFormProvider>
  )
}

// Export helper types for form state management
export type { UseFormReturn }
export type { FieldValues }
export type FormContextType = UseFormReturn
