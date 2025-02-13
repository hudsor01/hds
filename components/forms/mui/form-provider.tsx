import { useForm } from '@/lib/forms/use-form'
import { PropsWithChildren } from 'react'
import { FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface FormContainerProps<T extends z.ZodObject<unknown>> extends PropsWithChildren {
  schema: T
  defaultValues?: Partial<z.infer<T>>
  onSubmit: (data: z.infer<T>) => Promise<void> | void
  onError?: (error: Error) => void
}

export function FormContainer<T extends z.ZodObject<unknown>>({
  children,
  schema,
  defaultValues,
  onSubmit,
  onError
}: FormContainerProps<T>) {
  const methods = useForm({
    schema,
    defaultValues,
    onSubmit,
    onError
  })

  return <RHFFormProvider {...(methods as UseFormReturn)}>{children}</RHFFormProvider>
}
