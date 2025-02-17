import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
}

export function Input({ ...props }: InputProps) {
  return <TextField
      variant="outlined"
      fullWidth
      size="small"
      {...props}
    />
  )
}
