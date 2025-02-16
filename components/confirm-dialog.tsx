'use client'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { ErrorBoundary } from '@/components/error-boundary'
import { CircularProgress } from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel, isLoading = false }: ConfirmDialogProps) {
  return (
    <ErrorBoundary>
      <Dialog open={open} onClose={isLoading ? undefined : onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color="error"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorBoundary>
  )
}
