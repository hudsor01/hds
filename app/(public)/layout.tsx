'use client';

import { Box } from '@mui/material';
import Navbar from '@/components/layouts/Navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
