'use client'

import { FadeIn } from '@/components/fade-in'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { Home, Search } from 'react-feather'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#B7D1E2] p-4 dark:bg-[#89A5B7]">
      <div className="w-full max-w-md rounded-xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm md:p-8 dark:bg-gray-800/80">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl dark:text-gray-100">Oops! Page Not Found</h1>
        <div className="mb-8">
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please check the URL or navigate back home.</p>
        </div>
        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#96B5C6',
            '&:hover': {
              backgroundColor: '#7A9BB0'
            },
            fontFamily: 'inherit',
            textTransform: 'none',
            px: 6,
            py: 1.5,
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: '#7A9BB0',
              '&:hover': {
                backgroundColor: '#5E8299'
              }
            }
          }}
        >
          Return Home
        </Button>
      </div>
    </main>
  )
}
