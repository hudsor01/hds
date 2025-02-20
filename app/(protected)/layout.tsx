'use client'

import { Box } from '@mui/material'
import { ProtectedRoute } from '@/utils/auth/protected-route'
import Navbar from '@/components/layouts/navbar'

export default function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Navbar />
                <Box
                    component="main"
                    sx={{ flex: 1, bgcolor: 'background.default' }}
                >
                    {children}
                </Box>
            </Box>
        </ProtectedRoute>
    )
}
