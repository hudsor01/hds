import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  name: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return <TextField {...props} ref={ref} variant="outlined" fullWidth />
})

FormInput.displayName = 'FormInput'
