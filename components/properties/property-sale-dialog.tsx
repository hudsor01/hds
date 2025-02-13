'use client'

import { Button } from '@/components/ui/buttons/button'
import { Dialog } from '@/components/ui/dialogs/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PropertyRow, PropertySale } from '@/types/property'
import { useState } from 'react'

interface PropertySaleDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  property: PropertyRow
  onSubmitAction: (data: PropertySale) => Promise<void>
}

export function PropertySaleDialog({
  open,
  onOpenChangeAction,
  property,
  onSubmitAction
}: PropertySaleDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: PropertySale = {
        propertyId: property.id,
        salePrice: Number(formData.get('salePrice')),
        saleDate: new Date(formData.get('saleDate') as string).toISOString(),
        notes: (formData.get('notes') as string) || undefined
      }

      await onSubmitAction(data)
      onOpenChangeAction(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChangeAction(false)}
      title="Record Property Sale"
      description={`Record the sale details for ${property.name}`}
      footer={
        <Button type="submit" form="property-sale-form" disabled={isLoading}>
          {isLoading ? 'Recording...' : 'Record Sale'}
        </Button>
      }
    >
      <form id="property-sale-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="salePrice">Sale Price</Label>
            <Input id="salePrice" name="salePrice" type="number" min="0" step="0.01" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="saleDate">Sale Date</Label>
            <Input id="saleDate" name="saleDate" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              name="notes"
              placeholder="unknown additional details about the sale"
            />
          </div>
        </div>
      </form>
    </Dialog>
  )
}
