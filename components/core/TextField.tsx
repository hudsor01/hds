import { TextField as MuiTextField, styled } from '@mui/material'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'

const StyledTextField = styled(MuiTextField)(({ theme }: { theme: Theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius
  }
}))

export type TextFieldProps = MuiTextFieldProps

export function TextField(props: TextFieldProps) {
  return <StyledTextField {...props} />
}
