'use client'

import { useEffect, useState } from 'react'
import { Lease, CreateLeaseInput } from '@/types/lease'
import { useToast } from '@/hooks/use-toast'

export default function LeasesPage() {
  const [leases, setLeases] = useState<Lease[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchLeases()
  }, [])

  async function fetchLeases() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('leases')
        .select(
          `
          *,
          property:properties(id, name, address),
          tenant:tenants(id, first_name, last_name, email)
        `
        )
        .order('created_at', { ascending: false })

      if (error) throw error

      setLeases(data || [])
    } catch (error) {
      console.error('Error fetching leases:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch leases. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(data: CreateLeaseInput) {
    try {
      const { data: newLease, error } = await supabase
        .from('leases')
        .insert([
          {
            ...data,
            status: 'ACTIVE',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select(
          `
          *,
          property:properties(id, name, address),
          tenant:tenants(id, first_name, last_name, email)
        `
        )
        .single()

      if (error) throw error

      setLeases(prev => [newLease, ...prev])
      setIsDialogOpen(false)
      toast({
        title: 'Success',
        description: 'Lease created successfully.'
      })
    } catch (error) {
      console.error('Error creating lease:', error)
      toast({
        title: 'Error',
        description: 'Failed to create lease. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleUpdate(data: CreateLeaseInput) {
    if (!selectedLease) return

    try {
      const { data: updatedLease, error } = await supabase
        .from('leases')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedLease.id)
        .select(
          `
          *,
          property:properties(id, name, address),
          tenant:tenants(id, first_name, last_name, email)
        `
        )
        .single()

      if (error) throw error

      setLeases(prev => prev.map(lease => (lease.id === selectedLease.id ? updatedLease : lease)))
      setIsDialogOpen(false)
      setSelectedLease(null)
      toast({
        title: 'Success',
        description: 'Lease updated successfully.'
      })
    } catch (error) {
      console.error('Error updating lease:', error)
      toast({
        title: 'Error',
        description: 'Failed to update lease. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleDelete(leaseId: string) {
    try {
      const { error } = await supabase.from('leases').delete().eq('id', leaseId)

      if (error) throw error

      setLeases(prev => prev.filter(lease => lease.id !== leaseId))
      toast({
        title: 'Success',
        description: 'Lease deleted successfully.'
      })
    } catch (error) {
      console.error('Error deleting lease:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete lease. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leases</h1>
        <Button
          onClick={() => {
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Lease
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
        </div>
      ) : (
        <LeaseTable
          leases={leases}
          onEdit={lease => {
            setSelectedLease(lease)
            setIsDialogOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open)
          if (!open) setSelectedLease(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedLease ? 'Edit Lease' : 'Add Lease'}</DialogTitle>
            <DialogDescription>
              {selectedLease ? 'Update the lease details below.' : 'Fill in the lease details below to add a new lease.'}
            </DialogDescription>
          </DialogHeader>
          <LeaseForm
            initialData={selectedLease || undefined}
            onSubmit={selectedLease ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsDialogOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
