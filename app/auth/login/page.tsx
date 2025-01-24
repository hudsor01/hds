import { auth } from '@/auth/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '../components/login-form'

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
