import { TextField as MuiTextField, styled } from '@mui/material'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material'

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius
  }
}))

export type TextFieldProps = MuiTextFieldProps

export function TextField(props: TextFieldProps) {
  return <StyledTextField {...props} />
}
