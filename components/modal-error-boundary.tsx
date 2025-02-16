'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { Button, Typography, Box } from '@mui/material'
import { useModalStore } from '@/hooks/use-modal'
import { useToast } from '@/hooks/use-toast'

interface ErrorBoundaryProps {
  children: React.ReactNode
  modalId: string
}

function ErrorFallback({ error, resetErrorBoundary, modalId }: any) {
  const closeModal = useModalStore(state => state.closeModal)
  const { toast } = useToast()

  const handleClose = () => {
    closeModal(modalId)
    toast({
      type: 'error',
      title: 'Error',
      description: error.message
    })
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button onClick={resetErrorBoundary} variant="contained">
          Try again
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </Box>
    </Box>
  )
}

export function ModalErrorBoundary({ children, modalId }: ErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={props => <ErrorFallback {...props} modalId={modalId} />}
      onReset={() => {
        // Reset any state that might have caused the error
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
