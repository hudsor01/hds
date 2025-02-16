import { Dialog } from '@/components/ui/dialogs/dialog'
import { Button } from '@mui/material'
import { type ReactNode } from 'react'

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  children: ReactNode
  loading?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function FormDialog({
  open,
  onClose,
  onSubmit,
  title,
  children,
  loading = false,
  maxWidth = 'sm'
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
              }
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      }
    >
      <div className="mt-4">{children}</div>
    </Dialog>
  )
}
