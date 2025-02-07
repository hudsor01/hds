'use client';

import {Box, Container, Typography} from '@mui/material';
import dynamic from 'next/dynamic';

// Dynamically import the dashboard to reduce initial bundle size
const WaitlistDashboard = dynamic(() => import('./dashboard'), {
  loading: () => <div>Loading dashboard...</div>,
});

export default function WaitlistAdminPage() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{mb: 4}}>
        <Typography variant='h4' gutterBottom>
          Waitlist Management
        </Typography>
        <Typography color='text.secondary'>
          Monitor and manage your waitlist performance and user engagement
        </Typography>
      </Box>

      <WaitlistDashboard />
    </Container>
  );
}
