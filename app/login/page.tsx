'use client';

import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaLock, FaShieldAlt } from 'react-icons/fa';

import React, { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleGoogleLogin = () => {
    console.log('Google Login Clicked');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with', email);
  };

  return (
    <div className='font-roboto flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4'>
      <div className='w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between bg-blue-600 px-12 py-6 text-white'>
          <div className='flex items-center space-x-4'>
            <FaShieldAlt className='text-3xl' />
            <h1 className='text-2xl font-bold tracking-tight'>SecureLogin</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <a href='#' className='transition hover:text-blue-100'>
              Help
            </a>
            <a href='#' className='transition hover:text-blue-100'>
              Contact
            </a>
          </div>
        </div>

        <div className='grid md:grid-cols-2'>
          <div className='flex items-center justify-center bg-blue-50 p-12'>
            <div className='text-center'>
              <div className='mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-blue-200'>
                <FaLock className='text-6xl text-blue-600' />
              </div>
              <h3 className='mb-4 text-2xl font-bold text-blue-800'>Secure Authentication</h3>
              <p className='px-6 text-blue-600'>
                Protect your digital identity with our advanced security protocols and multi-factor
                authentication.
              </p>
            </div>
          </div>

          <div className='flex items-center p-12'>
            <div className='w-full'>
              <h2 className='mb-8 text-3xl font-bold tracking-tight text-blue-800'>Welcome Back</h2>

              <button
                onClick={handleGoogleLogin}
                className='mb-6 flex w-full items-center justify-center rounded-lg border border-blue-200 bg-white py-3 text-blue-700 transition duration-300 ease-in-out hover:bg-blue-50'
              >
                <FaGoogle className='mr-3 text-lg text-red-500' /> Continue with Google
              </button>

              <div className='my-6 flex items-center'>
                <div className='flex-grow border-t border-blue-200'></div>
                <span className='px-4 font-medium text-blue-400'>or</span>
                <div className='flex-grow border-t border-blue-200'></div>
              </div>

              <form onSubmit={handleEmailLogin} className='space-y-5'>
                <div className='relative'>
                  <FaEnvelope className='absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-400' />
                  <input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='w-full rounded-lg border border-blue-100 bg-white py-3.5 pl-12 pr-4 text-blue-800 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    required
                  />
                </div>

                <div className='relative'>
                  <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-400' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='w-full rounded-lg border border-blue-100 bg-white py-3.5 pl-12 pr-12 text-blue-800 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 transform text-blue-400 hover:text-blue-600'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type='submit'
                  className='w-full rounded-lg bg-blue-600 py-3.5 text-white transition duration-300 ease-in-out hover:bg-blue-700'
                >
                  Log In
                </button>
              </form>

              <div className='mt-6 text-center'>
                <a href='#' className='font-medium text-blue-600 hover:underline'>
                  Forgot Password?
                </a>
                <p className='mt-4 text-sm text-blue-400'>
                  Don't have an account?{' '}
                  <a href='#' className='text-blue-600 hover:underline'>
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
