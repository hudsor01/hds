declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_SUPABASE_URL: string
        NEXT_PUBLIC_SUPABASE_ANON_KEY: string
        STRIPE_SECRET_KEY: string
        STRIPE_WEBHOOK_SECRET: string
        RESEND_API_KEY: string
        DATABASE_URL: string
        NEXT_PUBLIC_APP_URL: string
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
        NEXT_PUBLIC_HCAPTCHA_SITE_KEY: string
        HCAPTCHA_SECRET_KEY: string
        [key: string]: string | undefined
    }
}
