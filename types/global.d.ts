/// <reference types="node" />
/// <reference types="react-dom" />

import * as React from 'react'

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test'
        readonly NEXT_PUBLIC_SUPABASE_URL: string
        readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string
        readonly STRIPE_SECRET_KEY: string
        readonly STRIPE_WEBHOOK_SECRET: string
        readonly DATABASE_URL: string
        readonly NEXT_PUBLIC_APP_URL: string
        [key: string]: string | undefined
    }
}

declare module '*.svg' {
    const content: React.FunctionComponent<
        React.SVGAttributes<SVGElement>
    >
    export default content
}

interface Window {
    fs: {
        readFile(
            path: string,
            options?: { encoding?: string }
        ): Promise<Buffer | string>
        writeFile(path: string, data: string): Promise<void>
    }
}
