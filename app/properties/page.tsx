'use client'

import { PropertyCard } from '@/components/dashboard/property-card'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import { Plus } from 'react-feather'

// Mock data for testing
const mockProperties = [
  {
    id: '1',
    name: 'Sunset Heights',
    address: '123 Sunset Blvd, Los Angeles, CA 90028',
    units: '24 Units',
    occupancy: '92%'
  },
  {
    id: '2',
    name: 'Ocean View Apartments',
    address: '456 Ocean Drive, Miami Beach, FL 33139',
    units: '16 Units',
    occupancy: '88%'
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    address: '789 Pine Road, Aspen, CO 81611',
    units: '12 Units',
    occupancy: '83%'
  }
]

export default function PropertiesPage() {
  return (
    <Box>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
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
            startIcon={<Plus size={20} />}
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
                bgcolor: 'primary.dark',
              }
            }}
          >
            Add Property
          </Button>
        </Stack>

        {/* Properties Grid */}
        <Grid container spacing={4}>
          {mockProperties.map(({ id, ...property }) => (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <PropertyCard {...property} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
