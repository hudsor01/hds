import React, { JSX } from 'react'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

interface TextInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  type?: string
  value: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText,
  ...props
}: TextInputProps): JSX.Element {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      {...props}
    />
  )
}
