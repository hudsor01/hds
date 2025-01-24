'use client';

import { Button, Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'react-feather'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCallbackUrl = '/dashboard';
  const callbackUrl = searchParams.get('callbackUrl') || defaultCallbackUrl;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', {
        callbackUrl: defaultCallbackUrl
      });
    } catch (error) {
      toast.error('Failed to login with Google');
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: defaultCallbackUrl,
      });

      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
      } else if (result?.url) {
        router.push(defaultCallbackUrl);
      }
    } catch (error) {
      toast.error('Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left side - Hero Section */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
                <p className="text-blue-100 mb-6">
                  Access your dashboard and manage your properties with ease.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Access</h3>
                    <p className="text-sm text-blue-100">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">24/7 Support</h3>
                    <p className="text-sm text-blue-100">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="p-8 md:p-12 md:w-1/2">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Sign in to your account</h3>
              <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outlined"
              fullWidth
              className="mb-6 py-3 normal-case"
              startIcon={<img src="/google.svg" alt="Google" className="w-5 h-5" />}
            >
              Continue with Google
            </Button>

            <div className="relative my-6">
              <Divider>
                <span className="px-2 text-gray-500">Or continue with</span>
              </Divider>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <TextField
                type="email"
                label="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: <Mail className="w-5 h-5 text-gray-400 mr-2" />,
                }}
              />

              <TextField
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: <Lock className="w-5 h-5 text-gray-400 mr-2" />,
                  endAdornment: (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  ),
                }}
              />

              <div className="flex items-center justify-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                  }
                  label="Remember me"
                />
                <a href="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                fullWidth
                className="py-3 bg-blue-600 hover:bg-blue-700 normal-case"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
