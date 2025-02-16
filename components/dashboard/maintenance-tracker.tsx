'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Badge } from '@/components/badge'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

export type MaintenanceStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface MaintenanceRequest {
  id: string
  propertyName: string
  description: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: MaintenanceStatus
  createdAt: string
  updatedAt: string
  estimatedCost?: number
  assignedTo?: string
}

interface MaintenanceTrackerProps {
  requests: MaintenanceRequest[]
  onViewRequest: (request: MaintenanceRequest) => void
}

export function MaintenanceTracker({ requests, onViewRequest }: MaintenanceTrackerProps) {
  const getPriorityColor = (priority: MaintenanceRequest['priority']) => {
    switch (priority) {
      case 'LOW':
        return 'bg-blue-500'
      case 'MEDIUM':
        return 'bg-yellow-500'
      case 'HIGH':
        return 'bg-orange-500'
      case 'URGENT':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500'
      case 'IN_PROGRESS':
        return 'bg-blue-500'
      case 'COMPLETED':
        return 'bg-green-500'
      case 'CANCELLED':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(request => (
              <TableRow key={request.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => onViewRequest(request)}>
                <TableCell className="font-medium">{request.propertyName}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', getPriorityColor(request.priority))}>
                    {request.priority.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', getStatusColor(request.status))}>
                    {request.status.toLowerCase().replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</TableCell>
                <TableCell>{request.assignedTo || 'Unassigned'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
