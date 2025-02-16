'use client'

import { Button } from '@/components/button'
import { type Lease, LEASE_STATUS, PAYMENT_FREQUENCY } from '@/types'
import type { Property } from '@/types/property'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Select } from '@/components/select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const leaseDialogSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  unitId: z.string().min(1, 'Unit is required'),
  tenantId: z.string().min(1, 'Tenant ID is required'),
  tenantName: z.string().min(1, 'Tenant name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  rentAmount: z
    .string()
    .transform(Number)
    .refine(val => val > 0, 'Rent amount must be positive'),
  securityDeposit: z
    .string()
    .transform(Number)
    .refine(val => val >= 0, 'Security deposit must be non-negative'),
  paymentFrequency: z.enum(
    Object.keys(PAYMENT_FREQUENCY) as [keyof typeof PAYMENT_FREQUENCY, ...Array<keyof typeof PAYMENT_FREQUENCY>]
  ),
  status: z.enum(Object.keys(LEASE_STATUS) as [keyof typeof LEASE_STATUS, ...Array<keyof typeof LEASE_STATUS>])
})

type LeaseDialogFormData = z.infer<typeof leaseDialogSchema>

interface LeaseDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  lease?: Lease
  properties: Property[]
  onSubmitAction: (lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt' | 'documents'>) => Promise<void>
}

export function LeaseDialog({ open, onOpenChangeAction, lease, properties, onSubmitAction }: LeaseDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset
  } = useForm<LeaseDialogFormData>({
    resolver: zodResolver(leaseDialogSchema),
    defaultValues: lease
      ? {
          ...lease,
          startDate: lease.startDate.toISOString().split('T')[0],
          endDate: lease.endDate.toISOString().split('T')[0]
        }
      : {}
  })

  const selectedPropertyId = watch('propertyId')
  const selectedProperty = properties.find(p => p.id === selectedPropertyId)

  const onSubmit = async (data: LeaseDialogFormData) => {
    try {
      const leaseData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        rentAmount: Number(data.rentAmount),
        securityDeposit: Number(data.securityDeposit)
      }
      await onSubmitAction(leaseData)
      reset()
      onOpenChangeAction(false)
    } catch (error) {
      console.error('Failed to save lease:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lease ? 'Edit Lease' : 'Add Lease'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propertyId">Property</Label>
              <Controller
                control={control}
                name="propertyId"
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      setValue('unitId', '') // Reset unit when property changes
                    }}
                    error={!!errors.propertyId}
                  >
                    <option value="">Select property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.propertyId && <p className="text-sm text-red-500">{errors.propertyId.message}</p>}
            </div>
            <div>
              <Label htmlFor="unitId">Unit</Label>
              <Controller
                control={control}
                name="unitId"
                render={({ field }) => (
                  <Select {...field} disabled={!selectedPropertyId} error={!!errors.unitId}>
                    <option value="">Select unit</option>
                    {selectedProperty?.units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        Unit {unit.number}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.unitId && <p className="text-sm text-red-500">{errors.unitId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tenantId">Tenant ID</Label>
              <Input {...register('tenantId')} placeholder="Enter tenant ID" error={!!errors.tenantId} />
              {errors.tenantId && <p className="text-sm text-red-500">{errors.tenantId.message}</p>}
            </div>
            <div>
              <Label htmlFor="tenantName">Tenant Name</Label>
              <Input {...register('tenantName')} placeholder="Enter tenant name" error={!!errors.tenantName} />
              {errors.tenantName && <p className="text-sm text-red-500">{errors.tenantName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input {...register('startDate')} type="date" error={!!errors.startDate} />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input {...register('endDate')} type="date" error={!!errors.endDate} />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rentAmount">Rent Amount</Label>
              <Input
                {...register('rentAmount')}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter rent amount"
                error={!!errors.rentAmount}
              />
              {errors.rentAmount && <p className="text-sm text-red-500">{errors.rentAmount.message}</p>}
            </div>
            <div>
              <Label htmlFor="securityDeposit">Security Deposit</Label>
              <Input
                {...register('securityDeposit')}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter security deposit"
                error={!!errors.securityDeposit}
              />
              {errors.securityDeposit && <p className="text-sm text-red-500">{errors.securityDeposit.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <Controller
                control={control}
                name="paymentFrequency"
                render={({ field }) => (
                  <Select {...field} error={!!errors.paymentFrequency}>
                    {Object.entries(PAYMENT_FREQUENCY).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.paymentFrequency && <p className="text-sm text-red-500">{errors.paymentFrequency.message}</p>}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select {...field} error={!!errors.status}>
                    {Object.entries(LEASE_STATUS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </Select>
                )}
              />
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => {
                reset()
                onOpenChangeAction(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : lease ? 'Save Changes' : 'Add Lease'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LeaseDialog
