'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { Button, Typography, Box } from '@mui/material'
import { useModalStore } from '@/hooks/use-modal'

interface FallbackProps {
  error: Error
  resetErrorBoundary: () => void
  modalId: string
}

function ModalErrorFallback({ error, resetErrorBoundary, modalId }: FallbackProps) {
  const closeModal = useModalStore(state => state.closeModal)

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button onClick={resetErrorBoundary} variant="contained">
          Try again
        </Button>
        <Button onClick={() => closeModal(modalId)} variant="outlined">
          Close
        </Button>
      </Box>
    </Box>
  )
}

export function ModalErrorBoundary({
  children,
  modalId
}: {
  children: React.ReactNode
  modalId: string
}) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ModalErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          modalId={modalId}
        />
      )}
      onReset={() => {
        // Reset any state that might have caused the error
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
