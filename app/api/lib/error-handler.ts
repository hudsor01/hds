import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public errors?: any[]
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export function handleError(error: unknown) {
    if (error instanceof ApiError) {
        return NextResponse.json(
            {
                message: error.message,
                code: error.code,
                errors: error.errors
            },
            { status: error.statusCode }
        )
    }

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                message: 'Validation error',
                code: 'VALIDATION_ERROR',
                errors: error.errors
            },
            { status: 400 }
        )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
            {
                message: 'Database error',
                code: error.code,
                errors: [error.message]
            },
            { status: 400 }
        )
    }

    console.error('Unhandled error:', error)

    return NextResponse.json(
        {
            message: 'Internal server error',
            code: 'INTERNAL_SERVER_ERROR'
        },
        { status: 500 }
    )
}
