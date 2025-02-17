import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/auth-provider'
import { createClient } from '@/lib/supabase/server'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <AuthProvider initialUser={session?.user ?? null}>
            {children}
            <Toaster />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
