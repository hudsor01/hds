import {useForm} from '@/lib/forms/use-form';
import {PropsWithChildren} from 'react';
import {FormProvider} from 'react-hook-form';
import {z} from 'zod';

interface FormContainerProps<T extends z.ZodObject<any>> extends PropsWithChildren {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  onError?: (error: Error) => void;
}

export function FormContainer<T extends z.ZodObject<any>>({
  children,
  schema,
  defaultValues,
  onSubmit,
  onError,
}: FormContainerProps<T>) {
  const form = useForm({
    schema,
    defaultValues,
    onSubmit,
    onError,
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
