'use client'

import { Box, Button, Container, Grid, Stack, Typography, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { type Property } from '@/types/properties'

export default function PropertiesPage() {
  const {
    data: properties,
    isLoading,
    error
  } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await fetch('/api/properties')
      if (!response.ok) {
        throw new Error('Failed to fetch properties')
      }
      const jsonData = (await response.json()) as { data: Property[] }
      return jsonData.data
    }
  })

  return (
    <Box component="main">
      <Container maxWidth="xl">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Properties
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your property portfolio
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus />}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 3,
              py: 1,
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            Add Property
          </Button>
        </Stack>

        {/* Error State */}
        {error instanceof Error && (
          <Typography color="error" mb={4} role="alert">
            {error.message}
          </Typography>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Properties Grid */}
        {properties && properties.length > 0 ? (
          <Grid container spacing={4}>
            {properties.map(property => (
              <Grid item xs={12} md={6} lg={4} key={property.id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        ) : properties && !isLoading ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No properties found
            </Typography>
            <Typography color="text.secondary">Add your first property to get started</Typography>
          </Box>
        ) : null}
      </Container>
    </Box>
  )
}
