'use client';

import { ProtectedRoute } from '@/components/features/auth/protected-route';
import { Box } from '@mui/material';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {children}
      </Box>
    </ProtectedRoute>
  );
}