import { Prisma } from '@prisma/client'

// Database connection types
export type DbConfig = {
    url: string
    ssl?: boolean
    maxConnections?: number
}

// Common database query options
export type DbQueryOptions = {
    include?: Record<string, boolean>
    select?: Record<string, boolean>
    where?: Record<string, any>
    orderBy?: Record<string, 'asc' | 'desc'>
    take?: number
    skip?: number
}

// Prisma specific types
export type PrismaTransaction = Prisma.TransactionClient
export type PrismaError =
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError

// Supabase specific types
export type SupabaseConfig = {
    url: string
    anonKey: string
    serviceRole?: string
}

// Generic database types
export type Timestamps = {
    created_at: Date
    updated_at: Date
}
