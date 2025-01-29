'use client'

import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import * as React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center',
            p: 4,
          }}
        >
          <ErrorOutline
            sx={{
              width: 48,
              height: 48,
              color: 'error.main',
              mb: 2,
            }}
          />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            color="primary"
          >
            Try again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
