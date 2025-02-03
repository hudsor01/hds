import {NotificationSettings} from '@/components/settings/notifications';
import {ProfileSection} from '@/components/settings/profile-section';
import {SecuritySettings} from '@/components/settings/security';

export default function SettingsPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold text-gray-900'>Settings</h2>
        <p className='mt-1 text-sm text-gray-600'>Manage your account settings and preferences</p>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        <ProfileSection />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}
