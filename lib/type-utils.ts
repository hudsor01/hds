import type { PrismaClient } from '@prisma/client'

// Type-safe database context
export type Context = {
    prisma: PrismaClient
}

// Utility type to make all properties required and non-nullable
export type Required<T> = {
    [P in keyof T]-?: NonNullable<T[P]>
}

// Utility type for API responses
export type ApiResponse<T> = {
    success: boolean
    data?: T
    error?: string
}

// Type guard for checking if something is a record
export const isRecord = (
    value: unknown
): value is Record<string, unknown> => {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    )
}
