declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_SUPABASE_URL: string
        SUPABASE_SERVICE_ROLE_KEY: string
        DATABASE_URL: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
    }
}
