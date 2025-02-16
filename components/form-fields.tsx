'use client'

import { Input } from '@/components/input'
import { getFieldError } from '@/lib/forms/use-form'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectProps,
  type TextFieldProps
} from '@mui/material'
import type { ReactNode } from 'react'
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form'

// Generic base interface for form fields
interface BaseFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  label: string
  required?: boolean
  disabled?: boolean
  className?: string
}

// TextField props
export interface FormInputProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T>,
    Omit<TextFieldProps, 'name' | 'label'> {
  helperText?: string
}

// Select field props
export interface SelectFieldProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T>,
    Omit<SelectProps, 'name' | 'label'> {
  options: Array<{
    label: string
    value: string | number
    disabled?: boolean
    description?: string
  }>
}

// Date field props
export interface DateFieldProps<T extends FieldValues = FieldValues>
  extends BaseFieldProps<T>,
    Omit<TextFieldProps, 'name' | 'label'> {
  minDate?: Date
  maxDate?: Date
}

// Checkbox field props
export interface CheckboxFieldProps<T extends FieldValues = FieldValues> extends Omit<BaseFieldProps<T>, 'label'> {
  label: ReactNode
  helperText?: string
}

// Generic form field error type
export interface FieldError {
  type: string
  message: string
}

// Form Input Component
export function FormInput<T extends FieldValues>({
  name,
  label,
  helperText,
  required,
  disabled,
  className,
  ...props
}: FormInputProps<T>): JSX.Element {
  const {
    register,
    formState: { errors }
  } = useFormContext<T>()

  const error = getFieldError(name, errors)

  return (
    <TextField
      {...register(name)}
      {...props}
      label={label}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      className={className}
      fullWidth
      inputProps={{
        'aria-label': label,
        'aria-required': required,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${name}-error` : undefined,
        ...props.inputProps
      }}
    />
  )
}

// Form Select Component
export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  required,
  disabled,
  className,
  ...props
}: SelectFieldProps<T>): JSX.Element {
  const {
    control,
    formState: { errors }
  } = useFormContext<T>()

  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!error} required={required} disabled={disabled} className={className}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            {...props}
            labelId={`${name}-label`}
            label={label}
            aria-label={label}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value} disabled={option.disabled} title={option.description}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(error || props.helperText) && (
            <FormHelperText id={error ? `${name}-error` : undefined}>{error || props.helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

// Form Date Picker Component
export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  minDate,
  maxDate,
  required,
  disabled,
  className,
  ...props
}: DateFieldProps<T>): JSX.Element {
  const {
    control,
    formState: { errors }
  } = useFormContext<T>()

  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          type="date"
          label={label}
          error={!!error}
          helperText={error}
          required={required}
          disabled={disabled}
          className={className}
          fullWidth
          InputLabelProps={{
            shrink: true,
            ...props.InputLabelProps
          }}
          inputProps={{
            'aria-label': label,
            'aria-required': required,
            'aria-invalid': !!error,
            'aria-describedby': error ? `${name}-error` : undefined,
            min: minDate?.toISOString().split('T')[0],
            max: maxDate?.toISOString().split('T')[0],
            ...props.inputProps
          }}
        />
      )}
    />
  )
}

// Form Checkbox Component
export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  className,
  helperText,
  ...props
}: CheckboxFieldProps<T>): JSX.Element {
  const {
    control,
    formState: { errors }
  } = useFormContext<T>()

  const error = getFieldError(name, errors)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={!!error} required={required} disabled={disabled} className={className}>
          <label htmlFor={name}>
            <Input
              id={name}
              type="checkbox"
              {...field}
              {...props}
              checked={field.value}
              aria-label={typeof label === 'string' ? label : undefined}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            {label}
          </label>
          {(error || helperText) && (
            <FormHelperText id={error ? `${name}-error` : undefined}>{error || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

// Export types for consumers
export type { FieldValues, Path }
