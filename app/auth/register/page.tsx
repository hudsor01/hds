import { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from '@/components/features/auth/register-form'

export const metadata: Metadata = {
  title: 'Register | Property Management System',
  description: 'Create your property management account'
}

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-muted-foreground text-sm">Enter your details below to create your account</p>
        </div>
        <RegisterForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
