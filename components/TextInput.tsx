'use client'

import React from 'react'
import { TextField, type TextFieldProps as MuiTextFieldProps, useTheme } from '@mui/material'

interface TextInputProps extends Omit<MuiTextFieldProps, 'variant'> {
  label: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  value: string | number
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  autoComplete?: string
  placeholder?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      type = 'text',
      value,
      onChange,
      required = false,
      disabled = false,
      error = false,
      helperText,
      autoComplete,
      placeholder,
      startAdornment,
      endAdornment,
      onFocus,
      onBlur,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()

    return (
      <TextField
        ref={ref}
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
        autoComplete={autoComplete}
        placeholder={placeholder}
        InputProps={{
          startAdornment,
          endAdornment,
          sx: {
            borderRadius: theme.shape.borderRadius,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? theme.palette.error.main : theme.palette.primary.main
            }
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: error ? theme.palette.error.main : theme.palette.primary.main
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.main
          },
          ...sx
        }}
        {...props}
      />
    )
  }
)

TextInput.displayName = 'TextInput'

// Export types
export type { TextInputProps }

// Utility function to create pre-configured text inputs
export const createTextInput = (
  config: Partial<TextInputProps>
): React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>> => {
  const ConfiguredInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => (
    <TextInput {...config} {...props} ref={ref} />
  ))

  ConfiguredInput.displayName = 'ConfiguredTextInput'
  return ConfiguredInput
}

// Common text input configurations
export const EmailInput = createTextInput({
  type: 'email',
  autoComplete: 'email',
  placeholder: 'Enter your email'
})

export const PasswordInput = createTextInput({
  type: 'password',
  autoComplete: 'current-password',
  placeholder: 'Enter your password'
})

export const SearchInput = createTextInput({
  type: 'search',
  placeholder: 'Search...'
})
