'use client'

import { useEffect, useState } from 'react'
import { FinancialSummary } from '@/components/dashboard/financial-summary'
import { MaintenanceTracker, MaintenanceRequest } from '@/components/dashboard/maintenance-tracker'
import { supabaseClient } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow, format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netIncome: 0,
    occupancyRate: 0,
    monthlyData: []
  })
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)

        // Fetch financial data
        const { data: propertiesData, error: propertiesError } = await supabaseClient
          .from('properties')
          .select(`
            id,
            name,
            monthly_rent,
            expenses,
            status,
            maintenance_requests (
              id,
              description,
              priority,
              status,
              created_at,
              updated_at,
              estimated_cost,
              assigned_to
            )
          `)

        if (propertiesError) throw propertiesError

        // Calculate financial summaries
        const totalRevenue = propertiesData.reduce((sum, p) => sum + p.monthly_rent, 0)
        const totalExpenses = propertiesData.reduce(
          (sum, p) => sum + Object.values(p.expenses).reduce((a, b) => a + b, 0),
          0
        )

        // Calculate occupancy rate
        const totalUnits = propertiesData.length
        const occupiedUnits = propertiesData.filter(p => p.status === 'ACTIVE').length
        const occupancyRate = (occupiedUnits / totalUnits) * 100

        // Process maintenance requests
        const maintenanceRequests = propertiesData.flatMap(property => 
          property.maintenance_requests.map(request => ({
            ...request,
            propertyName: property.name
          }))
        ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        // Fetch historical financial data for the last 6 months
        const { data: historicalData, error: historicalError } = await supabaseClient
          .from('financial_history')
          .select('*')
          .order('month', { ascending: false })
          .limit(6)

        if (historicalError) throw historicalError

        const monthlyData = historicalData.map(record => ({
          month: format(new Date(record.month), 'MMM'),
          revenue: record.revenue,
          expenses: record.expenses,
          netIncome: record.revenue - record.expenses
        })).reverse()

        setFinancialData({
          totalRevenue,
          totalExpenses,
          netIncome: totalRevenue - totalExpenses,
          occupancyRate,
          monthlyData,
        })

        setMaintenanceRequests(maintenanceRequests)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch dashboard data. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  const updateMaintenanceStatus = async (requestId: string, newStatus: MaintenanceRequest['status']) => {
    try {
      const { error } = await supabaseClient
        .from('maintenance_requests')
        .update({ status: newStatus })
        .eq('id', requestId)

      if (error) throw error

      setMaintenanceRequests(prev =>
        prev.map(request =>
          request.id === requestId
            ? { ...request, status: newStatus }
            : request
        )
      )

      setSelectedRequest(null)
      toast({
        title: 'Success',
        description: 'Maintenance request status updated successfully.',
      })
    } catch (error) {
      console.error('Error updating maintenance status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update maintenance status. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <FinancialSummary {...financialData} />

      <MaintenanceTracker 
        requests={maintenanceRequests}
        onViewRequest={setSelectedRequest}
      />

      <Dialog 
        open={!!selectedRequest} 
        onOpenChange={() => setSelectedRequest(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
            <DialogDescription>
              View and manage the maintenance request information below.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Property</h4>
                  <p className="text-sm">{selectedRequest.propertyName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "capitalize mt-1",
                      selectedRequest.status === 'PENDING' && "bg-yellow-500",
                      selectedRequest.status === 'IN_PROGRESS' && "bg-blue-500",
                      selectedRequest.status === 'COMPLETED' && "bg-green-500",
                      selectedRequest.status === 'CANCELLED' && "bg-gray-500"
                    )}
                  >
                    {selectedRequest.status.toLowerCase().replace('_', ' ')}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "capitalize mt-1",
                      selectedRequest.priority === 'LOW' && "bg-blue-500",
                      selectedRequest.priority === 'MEDIUM' && "bg-yellow-500",
                      selectedRequest.priority === 'HIGH' && "bg-orange-500",
                      selectedRequest.priority === 'URGENT' && "bg-red-500"
                    )}
                  >
                    {selectedRequest.priority.toLowerCase()}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(selectedRequest.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="text-sm mt-1">{selectedRequest.description}</p>
              </div>

              {selectedRequest.estimatedCost && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Estimated Cost</h4>
                  <p className="text-sm mt-1">${selectedRequest.estimatedCost.toLocaleString()}</p>
                </div>
              )}

              {selectedRequest.assignedTo && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Assigned To</h4>
                  <p className="text-sm mt-1">{selectedRequest.assignedTo}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex space-x-2">
            {selectedRequest?.status === 'PENDING' && (
              <Button
                onClick={() => updateMaintenanceStatus(selectedRequest.id, 'IN_PROGRESS')}
              >
                Start Work
              </Button>
            )}
            {selectedRequest?.status === 'IN_PROGRESS' && (
              <Button
                onClick={() => updateMaintenanceStatus(selectedRequest.id, 'COMPLETED')}
              >
                Mark Complete
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}