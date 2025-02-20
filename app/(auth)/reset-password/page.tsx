import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { ResetPasswordForm } from './reset-password-form'

export const metadata: Metadata = generatePageMetadata({
    title: 'Reset Password - Property Manager',
    description:
        'Set a new password for your Property Manager account',
    path: '/reset-password'
})

export default function ResetPasswordPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Reset your password
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your new password below
                    </p>
                </div>
                <ResetPasswordForm />
            </div>
        </div>
    )
}
