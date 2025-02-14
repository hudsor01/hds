import React from 'react'
import { Button } from '@/components/ui/button'
import { XCircle } from 'react-feather'
import { Alert } from '@mui/material'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="p-4">
          <Alert
            severity="error"
            icon={<XCircle className="h-4 w-4" />}
            action={
              <Button
                variant="outlined"
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                }}
              >
                Try again
              </Button>
            }
          >
            <div className="font-semibold">Something went wrong</div>
            <div className="text-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </div>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
