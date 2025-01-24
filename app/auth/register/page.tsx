import { auth } from '@/auth/lib/auth'
import { redirect } from 'next/navigation'
import { RegisterForm } from '../components/register-form'

export default async function RegisterPage() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2">Get started with your free account</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
