'use client'

import { Box, Container, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { usePermissions } from '@/hooks/usePermissions'
import { getRedirectPath } from '@/utils/auth/helpers'

export default function UnauthorizedPage() {
    const router = useRouter()
    const { user } = usePermissions()

    const handleRedirect = () => {
        const redirectPath = getRedirectPath(user)
        router.push(redirectPath)
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    py: 4
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    403
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Access Denied
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                >
                    You don't have permission to access this page.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRedirect}
                    sx={{ mt: 2 }}
                >
                    Return to Dashboard
                </Button>
            </Box>
        </Container>
    )
}
