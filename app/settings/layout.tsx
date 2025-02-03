import { ProfileSection } from '@/components/settings/profile-section'
import { SecuritySettings } from '@/components/settings/security'
import { SettingsSidebar } from '@/components/settings/sidebar'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsSidebar />
      <main className="flex-1 px-8 py-6">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

// app/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ProfileSection />
        <NotificationPreferences />
        <SecuritySettings />
      </div>
    </div>
  );
}
