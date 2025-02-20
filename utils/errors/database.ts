// Enhanced error handling with specific error types
export class DatabaseError extends Error {
    constructor(
        message: string,
        public code?: string,
        public details?: string,
        public status?: number
    ) {
        super(message)
        this.name = 'DatabaseError'
    }
}

export class ValidationError extends DatabaseError {
    constructor(message: string, details?: string) {
        super(message, 'VALIDATION_ERROR', details, 400)
        this.name = 'ValidationError'
    }
}

export class AuthorizationError extends DatabaseError {
    constructor(message: string) {
        super(message, 'AUTHORIZATION_ERROR', undefined, 403)
        this.name = 'AuthorizationError'
    }
}

function hasDetails(
    error: unknown
): error is { details: string; code?: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'details' in error
    )
}

export async function handleDatabaseError(
    error: unknown
): Promise<never> {
    console.error('Database error:', error)

    if (hasDetails(error) && error.code === '23505') {
        throw new ValidationError(
            'This record already exists.',
            error.details
        )
    }

    if (hasDetails(error) && error.code === '23503') {
        throw new ValidationError(
            'Referenced record does not exist.',
            error.details
        )
    }

    if (hasDetails(error) && error.code?.startsWith('28')) {
        throw new AuthorizationError(
            'You do not have permission to perform this action.'
        )
    }

    if (hasDetails(error) && error.code === '429') {
        throw new DatabaseError(
            'Too many requests. Please try again later.',
            error.code,
            error.details,
            429
        )
    }

    if (hasDetails(error) && error.code === '40001') {
        throw new DatabaseError(
            'The operation timed out. Please try again.',
            error.code,
            error.details,
            408
        )
    }

    throw new Error('An unexpected error occurred. Please try again.')
}
