export interface PrismaLogEvent {
    query?: string
    params?: unknown[]
    target?: string
    message: string
    duration?: number
    timestamp: string
}

export type PrismaLogLevel = 'query' | 'error' | 'warn' | 'info'
