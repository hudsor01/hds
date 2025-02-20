import { createServerSupabase } from '@/lib/supabase/server'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <Box 
      component="main" 
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="container relative flex min-h-screen flex-col items-center justify-center">
        {children}
      </div>
    </Box>
  )
}