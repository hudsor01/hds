'use client'

import { useEffect } from 'react'
import { Button } from '@mui/material'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import {
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert'

function ErrorFallback({
    error,
    resetErrorBoundary
}: {
    error: Error
    resetErrorBoundary: () => void
}) {
    useEffect(() => {
        // Log error to your error reporting service
        console.error('Error caught by boundary:', error)
    }, [error])

    return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6">
            <Alert variant="destructive" className="max-w-2xl">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription className="mt-2">
                    <div className="mb-4">{error.message}</div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={resetErrorBoundary}
                        className="mt-2"
                    >
                        Try again
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    )
}

export function PageErrorBoundary({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // Reset state here if needed
            }}
        >
            {children}
        </ReactErrorBoundary>
    )
}
