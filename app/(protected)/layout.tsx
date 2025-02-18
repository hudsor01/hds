import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/lib/session'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  // Get iron session
  const headersList = headers()
  const ironSession = await getIronSession(headersList, sessionOptions)

  // Validate iron session matches Supabase session
  if (!ironSession.user || ironSession.user.id !== session.user.id) {
    redirect('/sign-in')
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
