import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { ForgotPasswordForm } from './forgot-password-form'

export const metadata: Metadata = generatePageMetadata({
    title: 'Forgot Password - Property Manager',
    description: 'Reset your Property Manager account password',
    path: '/forgot-password'
})

export default function ForgotPasswordPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Forgot your password?
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email address and we&apos;ll send
                        you a reset link
                    </p>
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}
