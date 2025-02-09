import { Sidebar } from '@/components/layout/sidebar'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  )
}
