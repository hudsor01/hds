'use client'

import { Component, type ErrorInfo } from 'react'
import { Alert, AlertTitle, Button, Stack } from '@mui/material'
import { Error as ErrorIcon } from '@mui/icons-material'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: ErrorInfo | undefined
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Stack spacing={2} sx={{ alignItems: 'center', p: 3 }}>
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              action={
                <Button color="inherit" size="small" onClick={this.handleReset}>
                  Try Again
                </Button>
              }
            >
              <AlertTitle>Something went wrong</AlertTitle>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Alert>
            )
          </Stack>
        )
      )
    }
    return this.props.children
  }
}
