import { Box, Grid, Skeleton, Stack } from '@mui/material'

export function DashboardSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Skeleton height={40} width={200} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map(i => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Skeleton height={160} variant="rounded" />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {[1, 2].map(i => (
            <Grid key={i} item xs={12} md={6}>
              <Skeleton height={300} variant="rounded" />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  )
}
