'use client'

import { Box, Container, Grid, Paper, Skeleton, Stack } from '@mui/material'

export default function PricingLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Stack spacing={4} alignItems="center" textAlign="center" maxWidth="md" mx="auto" mb={8}>
        <Box>
          <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width={400} height={40} sx={{ mx: 'auto' }} />
        </Box>
      </Stack>

      <Grid container spacing={4} alignItems="stretch">
        {[0, 1, 2, 3, 4].map((index) => (
          <Grid item xs={12} sm={6} md={index === 2 ? 12 : 6} lg={index === 2 ? 12 : 6} xl={12/5} key={index}>
            <Paper
              elevation={index === 2 ? 8 : 1}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                ...(index === 2 && {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                  borderStyle: 'solid'
                })
              }}
            >
              <Stack spacing={2}>
                <Skeleton variant="text" width={120} height={40} />
                <Skeleton variant="text" width="80%" height={24} />

                <Box sx={{ my: 2 }}>
                  <Skeleton variant="text" width={100} height={48} />
                  <Skeleton variant="text" width={80} height={24} />
                </Box>

                <Stack spacing={1.5} sx={{ mb: 3, flexGrow: 1 }}>
                  {[...Array(index === 2 ? 9 : 7)].map((_, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="text" width="90%" height={24} />
                    </Stack>
                  ))}
                </Stack>

                <Skeleton variant="rectangular" width="100%" height={48} />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Skeleton variant="text" width={200} height={32} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="rectangular" width={160} height={48} sx={{ mx: 'auto' }} />
      </Box>
    </Container>
  )
}
