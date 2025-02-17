import { FormControl, FormHelperText, FormLabel } from '@mui/material'
import type { FormControlProps, FormHelperTextProps, FormLabelProps } from '@mui/material'
import { Controller, ControllerProps, FieldValues, FormProvider, useFormContext } from 'react-hook-form'

export { FormProvider as Form }

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends string = string>
  extends ControllerProps<TFieldValues, TName> {}

export function FormField<TFieldValues extends FieldValues = FieldValues, TName extends string = string>({
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  return <Controller {...props} />
}

export interface FormItemProps extends FormControlProps {
  // Add any custom props here if needed
}

export function FormItem({ children, ...props }: FormItemProps) {
  return (
    <FormControl fullWidth {...props}>
      {children}
    </FormControl>
  )
}

export interface FormLabelExtendedProps extends FormLabelProps {
  // Add any custom props here if needed
}

export function FormLabel({ children, ...props }: FormLabelExtendedProps) {
  return <FormLabel {...props}>{children}</FormLabel>
}

export interface FormMessageProps extends FormHelperTextProps {
  // Add any custom props here if needed
}

export function FormMessage({ children, ...props }: FormMessageProps) {
  const {
    formState: { errors }
  } = useFormContext()

  if (!errors) {
    return null
  }

  return (
    <FormHelperText error {...props}>
      {children}
    </FormHelperText>
  )
}
