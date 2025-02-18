'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/sign-in')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="bg-background min-h-screen">
      <TopNav />
      <div className="flex h-[calc(100vh-4rem)]">
        <SideNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
