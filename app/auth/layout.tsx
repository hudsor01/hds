import { Box } from '@mui/material'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box 
      component="main" 
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      {children}
    </Box>
  )
}