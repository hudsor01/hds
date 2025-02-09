'use client'

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Plus } from 'react-feather'

// Mock data for testing
const mockTenants = [
  {
    id: '1',
    name: 'John Doe',
    unit: '101',
    property: 'Sunset Heights',
    leaseStart: '2023-01-15',
    leaseEnd: '2024-01-14',
    rentAmount: 2500,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    unit: '305',
    property: 'Ocean View Apartments',
    leaseStart: '2023-03-01',
    leaseEnd: '2024-02-29',
    rentAmount: 2800,
    status: 'Active',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    unit: '203',
    property: 'Mountain Lodge',
    leaseStart: '2023-06-15',
    leaseEnd: '2024-06-14',
    rentAmount: 2200,
    status: 'Active',
  },
]

export default function TenantsPage() {
  return (
    <Box>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Tenants
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your tenants and leases
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
              },
            }}
          >
            Add Tenant
          </Button>
        </Stack>

        {/* Tenants Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Lease Start</TableCell>
                <TableCell>Lease End</TableCell>
                <TableCell>Rent Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTenants.map((tenant) => (
                <TableRow
                  key={tenant.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.unit}</TableCell>
                  <TableCell>{tenant.property}</TableCell>
                  <TableCell>{new Date(tenant.leaseStart).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(tenant.leaseEnd).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(tenant.rentAmount)}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: tenant.status === 'Active' ? 'success.light' : 'error.light',
                        color: tenant.status === 'Active' ? 'success.dark' : 'error.dark',
                        fontSize: '0.875rem',
                      }}
                    >
                      {tenant.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
