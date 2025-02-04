import {useToast} from '@/hooks/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback} from 'react';
import {useForm as useReactHookForm} from 'react-hook-form';
import {z} from 'zod';

interface UseFormOptions<T extends z.ZodType> {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  onError?: (error: Error) => void;
}

export function useForm<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  onError,
}: UseFormOptions<T>) {
  const {showToast} = useToast();

  const form = useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const handleSubmit = useCallback(
    async (data: z.infer<T>) => {
      try {
        await onSubmit(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        showToast(message, 'error');
        onError?.(error instanceof Error ? error : new Error(message));
      }
    },
    [onSubmit, onError, showToast],
  );

  return {
    ...form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}

// Form field components
export function createFormField<T extends z.ZodType>(schema: T) {
  return {
    getFieldProps: (name: keyof z.infer<T>) => ({
      name,
      required: schema.shape[name]?._def?.typeName === 'ZodString',
    }),
  };
}

// Form validation schemas
export function createFormSchema<T extends Record<string, z.ZodType>>(fields: T) {
  return z.object(fields);
}
