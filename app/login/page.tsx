'use client';

import { LoginForm } from '@/components/forms/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-2xl font-bold text-center'>Welcome back</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
