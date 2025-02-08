'use client';

import { Box, Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton variant="rectangular" width="200px" height={40} />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangular" height={60} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="mt-8">
        <Skeleton variant="rectangular" height={200} />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Welcome Text Skeleton */}
      <Stack spacing={1} mb={4}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width={400} height={24} />
      </Stack>

      {/* Stats Cards Skeleton */}
      <Grid container spacing={3} mb={4}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <Box sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width={80} height={40} />
                  <Skeleton variant="text" width={120} height={24} />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton variant="text" width={40} height={20} />
                    <Skeleton variant="text" width={60} height={20} />
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Skeleton */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Skeleton variant="text" width={200} height={32} />
                <Grid container spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card sx={{ p: 2 }}>
                        <Stack spacing={1}>
                          <Skeleton variant="circular" width={32} height={32} />
                          <Skeleton variant="text" width={120} height={24} />
                          <Skeleton variant="text" width={160} height={20} />
                        </Stack>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity Skeleton */}
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Skeleton variant="text" width={150} height={32} />
                  <Stack direction="row" spacing={1}>
                    {[...Array(4)].map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rounded"
                        width={80}
                        height={32}
                      />
                    ))}
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Skeleton variant="circular" width={40} height={40} />
                      <Stack spacing={1} flex={1}>
                        <Skeleton variant="text" width="60%" height={24} />
                        <Skeleton variant="text" width="40%" height={20} />
                      </Stack>
                      <Skeleton variant="rounded" width={80} height={32} />
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
}
