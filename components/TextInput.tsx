'use client'

import React from 'react'
import type { JSX } from 'react'
import { TextField } from '@mui/material'
import { type TextInputProps } from '@/types/components'

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
