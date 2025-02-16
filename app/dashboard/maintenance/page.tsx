'use client'

import { useEffect, useState } from 'react'
import { MaintenanceRequestForm } from '@/components/maintenance/maintenance-request-form'
import { MaintenanceRequestTable } from '@/components/maintenance/maintenance-request-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MaintenanceRequest, CreateMaintenanceRequestInput } from '@/types/maintenance'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@/utils/supabase/client'

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchMaintenanceRequests()
  }, [])

  async function fetchMaintenanceRequests() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select(`
          *,
          property:properties(id, name, address),
          assigned_to:users(id, first_name, last_name, email)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setRequests(data || [])
    } catch (error) {
      console.error('Error fetching maintenance requests:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch maintenance requests. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(data: CreateMaintenanceRequestInput) {
    try {
      const { data: newRequest, error } = await supabase
        .from('maintenance_requests')
        .insert([{
          ...data,
          status: 'PENDING',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select(`
          *,
          property:properties(id, name, address),
          assigned_to:users(id, first_name, last_name, email)
        `)
        .single()

      if (error) throw error

      setRequests((prev) => [newRequest, ...prev])
      setIsDialogOpen(false)
      toast({
        title: 'Success',
        description: 'Maintenance request created successfully.',
      })
    } catch (error) {
      console.error('Error creating maintenance request:', error)
      toast({
        title: 'Error',
        description: 'Failed to create maintenance request. Please try again.',
        variant: 'destructive',
      })
    }
  }

  async function handleUpdate(data: CreateMaintenanceRequestInput) {
    if (!selectedRequest) return

    try {
      const { data: updatedRequest, error } = await supabase
        .from('maintenance_requests')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedRequest.id)
        .select(`
          *,
          property:properties(id, name, address),
          assigned_to:users(id, first_name, last_name, email)
        `)
        .single()

      if (error) throw error

      setRequests((prev) =>
        prev.map((request) => (request.id === selectedRequest.id ? updatedRequest : request))
      )
      setIsDialogOpen(false)
      setSelectedRequest(null)
      toast({
        title: 'Success',
        description: 'Maintenance request updated successfully.',
      })
    } catch (error) {
      console.error('Error updating maintenance request:', error)
      toast({
        title: 'Error',
        description: 'Failed to update maintenance request. Please try again.',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete(requestId: string) {
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .delete()
        .eq('id', requestId)

      if (error) throw error

      setRequests((prev) => prev.filter((request) => request.id !== requestId))
      toast({
        title: 'Success',
        description: 'Maintenance request deleted successfully.',
      })
    } catch (error) {
      console.error('Error deleting maintenance request:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete maintenance request. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Request
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <MaintenanceRequestTable
          requests={requests}
          onEdit={(request) => {
            setSelectedRequest(request)
            setIsDialogOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setSelectedRequest(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRequest ? 'Edit Maintenance Request' : 'Add Maintenance Request'}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest 
                ? 'Update the maintenance request details below.'
                : 'Fill in the maintenance request details below.'}
            </DialogDescription>
          </DialogHeader>
          <MaintenanceRequestForm
            initialData={selectedRequest || undefined}
            onSubmit={selectedRequest ? handleUpdate : handleCreate}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}