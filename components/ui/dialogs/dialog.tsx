import type { DialogProps } from '../../../types/mui'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog
} from '@mui/material'
import * as React from 'react'
import { X } from 'react-feather'

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, title, description, children, footer }, ref) => {
    return (
      <MuiDialog
        open={open}
        onClose={onClose}
        ref={ref}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <X size={20} />
        </IconButton>

        {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}

        <DialogContent>
          {description && (
            <DialogContentText id="dialog-description">{description}</DialogContentText>
          )}
          {children}
        </DialogContent>

        {footer && <DialogActions>{footer}</DialogActions>}
      </MuiDialog>
    )
  }
)

Dialog.displayName = 'Dialog'

export { Dialog }
