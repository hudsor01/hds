'use client'

import { useToast } from '@/hooks/use-toast'
import { CreateTenantInput, Tenant } from '@/types/tenant'
import type { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchTenants()
  }, [])

  async function fetchTenants() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from('tenants').select('*, leases(*)').order('created_at', { ascending: false })

      if (error) throw error

      setTenants(data || [])
    } catch (error) {
      console.error('Error fetching tenants:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch tenants. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(data: CreateTenantInput) {
    try {
      const { data: newTenant, error } = await supabase.from('tenants').insert([data]).select().single()

      if (error) throw error

      setTenants(prev => [newTenant, ...prev])
      setIsDialogOpen(false)
      toast({
        title: 'Success',
        description: 'Tenant created successfully.'
      })
    } catch (error) {
      console.error('Error creating tenant:', error)
      toast({
        title: 'Error',
        description: 'Failed to create tenant. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleUpdate(data: CreateTenantInput) {
    if (!selectedTenant) return

    try {
      const { data: updatedTenant, error } = await supabase
        .from('tenants')
        .update(data)
        .eq('id', selectedTenant.id)
        .select()
        .single()

      if (error) throw error

      setTenants(prev => prev.map(t => (t.id === selectedTenant.id ? updatedTenant : t)))
      setIsDialogOpen(false)
      setSelectedTenant(null)
      toast({
        title: 'Success',
        description: 'Tenant updated successfully.'
      })
    } catch (error) {
      console.error('Error updating tenant:', error)
      toast({
        title: 'Error',
        description: 'Failed to update tenant. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleDelete(tenantId: string) {
    try {
      const { error } = await supabase.from('tenants').delete().eq('id', tenantId)

      if (error) throw error

      setTenants(prev => prev.filter(t => t.id !== tenantId))
      toast({
        title: 'Success',
        description: 'Tenant deleted successfully.'
      })
    } catch (error) {
      console.error('Error deleting tenant:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete tenant. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <Button
          onClick={() => {
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
        </div>
      ) : (
        <TenantTable
          tenants={tenants}
          onEdit={tenant => {
            setSelectedTenant(tenant)
            setIsDialogOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open)
          if (!open) setSelectedTenant(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTenant ? 'Edit Tenant' : 'Add Tenant'}</DialogTitle>
            <DialogDescription>
              {selectedTenant ? 'Update the tenant details below.' : 'Fill in the tenant details below to add a new tenant.'}
            </DialogDescription>
          </DialogHeader>
          <TenantForm
            initialData={selectedTenant || undefined}
            onSubmit={selectedTenant ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsDialogOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
