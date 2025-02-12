'use client'

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { Plus } from 'react-feather'

// Mock data for testing
const mockTickets = [
  {
    id: '1',
    title: 'Leaking Faucet',
    property: 'Sunset Heights',
    unit: '203',
    tenant: 'John Doe',
    priority: 'Medium',
    status: 'PENDING',
    createdAt: '2024-01-15T10:30:00Z',
    description: 'Kitchen sink faucet is leaking continuously.'
  },
  {
    id: '2',
    title: 'AC Not Working',
    property: 'Ocean View Apartments',
    unit: '305',
    tenant: 'Sarah Smith',
    priority: 'High',
    status: 'IN_PROGRESS',
    createdAt: '2024-01-14T15:45:00Z',
    description: 'Air conditioning unit is not cooling properly.'
  },
  {
    id: '3',
    title: 'Broken Window',
    property: 'Mountain Lodge',
    unit: '101',
    tenant: 'Michael Johnson',
    priority: 'High',
    status: 'COMPLETED',
    createdAt: '2024-01-13T09:15:00Z',
    description: 'Window in living room is cracked and needs replacement.'
  }
]

export default function MaintenancePage() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          bg: 'warning.light',
          color: 'warning.dark'
        }
      case 'IN_PROGRESS':
        return {
          bg: 'info.light',
          color: 'info.dark'
        }
      case 'COMPLETED':
        return {
          bg: 'success.light',
          color: 'success.dark'
        }
      default:
        return {
          bg: 'grey.200',
          color: 'grey.700'
        }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return {
          bg: 'error.light',
          color: 'error.dark'
        }
      case 'medium':
        return {
          bg: 'warning.light',
          color: 'warning.dark'
        }
      case 'low':
        return {
          bg: 'success.light',
          color: 'success.dark'
        }
      default:
        return {
          bg: 'grey.200',
          color: 'grey.700'
        }
    }
  }

  return (
    <Box>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Maintenance
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage maintenance requests
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
                bgcolor: 'primary.dark'
              }
            }}
          >
            New Request
          </Button>
        </Stack>

        {/* Status Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Requests" />
            <Tab label="Pending" />
            <Tab label="In Progress" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        {/* Tickets Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Tenant</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTickets.map(ticket => (
                <TableRow
                  key={ticket.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {ticket.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ticket.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{ticket.property}</TableCell>
                  <TableCell>{ticket.unit}</TableCell>
                  <TableCell>{ticket.tenant}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: getPriorityColor(ticket.priority).bg,
                        color: getPriorityColor(ticket.priority).color,
                        fontSize: '0.875rem'
                      }}
                    >
                      {ticket.priority}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: getStatusColor(ticket.status).bg,
                        color: getStatusColor(ticket.status).color,
                        fontSize: '0.875rem'
                      }}
                    >
                      {ticket.status.replace('_', ' ')}
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
