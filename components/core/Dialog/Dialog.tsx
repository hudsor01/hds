import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, styled } from '@mui/material'
import type { DialogProps as MuiDialogProps } from '@mui/material'

export interface DialogProps extends MuiDialogProps {
  title?: string
  actions?: React.ReactNode
}

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius
  }
}))

export function Dialog({ title, actions, children, ...props }: DialogProps) {
  return (
    <StyledDialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </StyledDialog>
  )
}
