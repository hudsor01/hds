'use client';

// Import your settings components here
import { BillingSettings } from 'components/settings/billing';
import { GeneralSettings } from 'components/settings/general';
import { NotificationSettings } from 'components/settings/notifications';
import { SecuritySettings } from 'components/settings/security';
import { Tabs } from 'components/ui/tabs';

import { useState } from 'react';

import { Box, Card, Container, Typography } from '@mui/material';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    {
      label: 'General',
      content: <GeneralSettings />,
    },
    {
      label: 'Notifications',
      content: <NotificationSettings />,
    },
    {
      label: 'Security',
      content: <SecuritySettings />,
    },
    {
      label: 'Billing',
      content: <BillingSettings />,
    },
  ];

  return (
    <Container maxWidth='lg'>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' gutterBottom>
          Settings
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Manage your account settings and preferences
        </Typography>
      </Box>

      <Card>
        <Tabs value={activeTab} onChange={handleTabChange} items={tabs} />
      </Card>
    </Container>
  );
}
