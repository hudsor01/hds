'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Lease, LEASE_STATUS, PAYMENT_FREQUENCY } from "@/lib/types/leases"
import { Property } from "@/lib/types/properties"
import { useState } from "react"

interface LeaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lease?: Lease
  properties: Property[]
  onSubmit: (lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt' | 'documents'>) => Promise<void>
}

export function LeaseDialog({ open, onOpenChange, lease, properties, onSubmit }: LeaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(
    lease ? properties.find(p => p.id === lease.propertyId) : undefined
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const property = properties.find(p => p.id === formData.get("propertyId"))
      const unit = property?.units.find(u => u.id === formData.get("unitId"))

      if (!property || !unit) {
        throw new Error("Invalid property or unit selected")
      }

      const leaseData = {
        propertyId: property.id,
        propertyName: property.name,
        unitId: unit.id,
        unitNumber: unit.number,
        tenantId: formData.get("tenantId") as string,
        tenantName: formData.get("tenantName") as string,
        startDate: new Date(formData.get("startDate") as string),
        endDate: new Date(formData.get("endDate") as string),
        rentAmount: parseFloat(formData.get("rentAmount") as string),
        securityDeposit: parseFloat(formData.get("securityDeposit") as string),
        paymentFrequency: formData.get("paymentFrequency") as keyof typeof PAYMENT_FREQUENCY,
        status: formData.get("status") as keyof typeof LEASE_STATUS,
      }

      await onSubmit(leaseData)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save lease")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lease ? 'Edit Lease' : 'Add Lease'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyId">Property</Label>
              <Select
                name="propertyId"
                value={selectedProperty?.id}
                onValueChange={(value) => {
                  const property = properties.find(p => p.id === value)
                  setSelectedProperty(property)
                }}
                required
              >
                <option value="">Select property</option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="unitId">Unit</Label>
              <Select
                name="unitId"
                defaultValue={lease?.unitId}
                required
                disabled={!selectedProperty}
              >
                <option value="">Select unit</option>
                {selectedProperty?.units.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.number}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tenantId">Tenant ID</Label>
              <Input
                id="tenantId"
                name="tenantId"
                defaultValue={lease?.tenantId}
                required
                placeholder="Enter tenant ID"
              />
            </div>
            <div>
              <Label htmlFor="tenantName">Tenant Name</Label>
              <Input
                id="tenantName"
                name="tenantName"
                defaultValue={lease?.tenantName}
                required
                placeholder="Enter tenant name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={lease?.startDate.toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={lease?.endDate.toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rentAmount">Rent Amount</Label>
              <Input
                id="rentAmount"
                name="rentAmount"
                type="number"
                min="0"
                step="0.01"
                defaultValue={lease?.rentAmount}
                required
                placeholder="Enter rent amount"
              />
            </div>
            <div>
              <Label htmlFor="securityDeposit">Security Deposit</Label>
              <Input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min="0"
                step="0.01"
                defaultValue={lease?.securityDeposit}
                required
                placeholder="Enter security deposit"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Select
                name="paymentFrequency"
                defaultValue={lease?.paymentFrequency}
                required
              >
                {Object.entries(PAYMENT_FREQUENCY).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue={lease?.status}
                required
              >
                {Object.entries(LEASE_STATUS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : lease ? 'Save Changes' : 'Add Lease'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
