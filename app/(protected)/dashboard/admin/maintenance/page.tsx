'use client'

import { useState, useEffect } from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  status: string
  created_at: string
}

export default function AdminMaintenance() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const { data, error } = await supabase.from('maintenance_requests').select('*')
    if (error) {
      console.error('Error fetching maintenance requests:', error)
    } else {
      setRequests(data || [])
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('maintenance_requests').update({ status: newStatus }).eq('id', id)

    if (error) {
      console.error('Error updating maintenance request:', error)
    } else {
      fetchRequests()
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Manage Maintenance Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {request.status === 'pending' && <Button onClick={() => updateStatus(request.id, 'in_progress')}>Start</Button>}
                  {request.status === 'in_progress' && (
                    <Button onClick={() => updateStatus(request.id, 'completed')}>Complete</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
