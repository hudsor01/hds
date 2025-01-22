'use client'

import { Box, Container, Grid, Skeleton, Stack } from '@mui/material'
import { motion } from 'framer-motion'

export default function PricingLoading() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Header Loading */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 }, bgcolor: 'primary.main' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Skeleton
              variant="text"
              width="60%"
              height={80}
              sx={{
                mb: 2,
                mx: 'auto',
                bgcolor: 'primary.light',
                borderRadius: 2
              }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{
                mb: 4,
                mx: 'auto',
                bgcolor: 'primary.light',
                borderRadius: 2
              }}
            />
          </motion.div>
        </Container>
      </Box>

      {/* Pricing Cards Loading */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 15, position: 'relative' }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Grid item xs={12} md={6} lg={index === 2 ? 12 : 6} xl={index === 2 ? 12 : 6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    boxShadow: index === 2 ? 12 : 4,
                    ...(index === 2 && {
                      transform: 'scale(1.02)',
                    })
                  }}
                >
                  <Stack spacing={2}>
                    {/* Title and Description */}
                    <Skeleton variant="text" width="40%" height={40} />
                    <Skeleton variant="text" width="60%" height={24} />

                    {/* Price */}
                    <Skeleton variant="text" width="30%" height={60} sx={{ mt: 4 }} />

                    {/* Features */}
                    {Array(index === 2 ? 9 : 7).fill(0).map((_, i) => (
                      <Stack key={i} direction="row" spacing={2} alignItems="center">
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="80%" height={24} />
                      </Stack>
                    ))}

                    {/* Button */}
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={48}
                      sx={{
                        mt: 4,
                        borderRadius: 2
                      }}
                    />
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Loading */}
        <Box sx={{ mt: 15 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Skeleton
              variant="text"
              width="40%"
              height={60}
              sx={{ mb: 8, mx: 'auto' }}
            />
            <Grid container spacing={4}>
              {[1, 2, 3, 4].map((_, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  >
                    <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="90%" height={24} />
                    <Skeleton variant="text" width="80%" height={24} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}
