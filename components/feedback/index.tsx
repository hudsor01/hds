import { Alert, AlertProps, Button, Stack, Typography } from '@mui/material'
import { Component, ErrorInfo, ReactNode } from 'react'

// Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Stack spacing={2} alignItems="center" sx={{ p: 4 }}>
          <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
          </Alert>
          <Button variant="contained" onClick={this.handleReset}>
            Try Again
          </Button>
        </Stack>
      )
    }

    return this.props.children
  }
}

// Form Message
interface FormMessageProps extends AlertProps {
  message: string
}

export function FormMessage({ message, severity = 'info', ...props }: FormMessageProps) {
  return (
    <Alert severity={severity} {...props}>
      {message}
    </Alert>
  )
}

// Environment Warning
interface EnvWarningProps {
  missingVars: string[]
}

export function EnvWarning({ missingVars }: EnvWarningProps) {
  if (missingVars.length === 0) return null

  return (
    <Alert severity="warning" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Missing Environment Variables
      </Typography>
      <Typography variant="body2">
        The following environment variables are required but not set:
      </Typography>
      <ul>
        {missingVars.map((variable) => (
          <li key={variable}>{variable}</li>
        ))}
      </ul>
    </Alert>
  )
}
