'use client'

import { Container, Typography, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </Typography>
        <Button component={Link} href="/" variant="contained" color="primary" sx={{ mt: 2 }}>
          Return to Home
        </Button>
      </Box>
    </Container>
  )
}
