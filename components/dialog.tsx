'use client'

import type { DialogProps } from '@/types/mui'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Dialog as MuiDialog } from '@mui/material'
import { Close } from '@mui/icons-material'
import * as React from 'react'

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onClose, title, description, children, footer },
  ref
) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      ref={ref}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      {onClose && (
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
          <Close />
        </IconButton>
      )}

      {title && <DialogTitle id="dialog-title">{title}</DialogTitle>}

      <DialogContent>
        {description && <DialogContentText id="dialog-description">{description}</DialogContentText>}
        {children}
      </DialogContent>

      {footer && <DialogActions>{footer}</DialogActions>}
    </MuiDialog>
  )
})

export { Dialog }
