'use client'

import type { AlertProps } from '@mui/material'
import { Alert } from '@mui/material'

interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
    error: string | null
}

export function ErrorAlert({ error, ...props }: ErrorAlertProps) {
    if (!error) return null

    return (
        <Alert severity="error" {...props}>
            {error}
        </Alert>
    )
}
