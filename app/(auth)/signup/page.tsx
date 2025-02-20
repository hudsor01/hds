import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { SignUpForm } from './signup-form'

export const metadata: Metadata = generatePageMetadata({
    title: 'Sign Up - Property Manager',
    description: 'Create your Property Manager account',
    path: '/signup'
})

export default function SignUpPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your details to create your account
                    </p>
                </div>
                <SignUpForm />
            </div>
        </div>
    )
}
