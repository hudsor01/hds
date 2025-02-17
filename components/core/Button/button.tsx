import type { ButtonProps as MuiButtonProps } from '@mui/material'
import { Button as MuiButton, styled } from '@mui/material'
import type { Theme } from '@mui/material/styles'

export type ButtonProps = MuiButtonProps & {
  loading?: boolean
}

const StyledButton = styled(MuiButton)(({ theme }: { theme: Theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none'
}))

export function Button({ loading, disabled, children, ...props }: ButtonProps) {
  return (
    <StyledButton disabled={loading || disabled} {...props}>
      {children}
    </StyledButton>
  )
}
