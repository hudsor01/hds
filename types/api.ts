import { type NextRequest } from 'next/server'

export interface ApiResponse<T = any> {
    data?: T
    error?: {
        code: string
        message: string
        errors?: any[]
    }
}

export interface ApiContext {
    params: Record<string, string>
}

export interface ApiHandler {
    (req: NextRequest, ctx: ApiContext): Promise<Response>
}

export interface AuthenticatedApiHandler {
    (
        req: NextRequest,
        ctx: ApiContext & { user: any }
    ): Promise<Response>
}

export interface ValidationError {
    code: string
    message: string
    path: string[]
}
