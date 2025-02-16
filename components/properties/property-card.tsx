'use client'

import { Property } from '@/types/property'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyActionsMenu } from './property-actions-menu'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  onEdit: (property: Property) => void
  onDelete: (propertyId: string) => void
  onViewTenants: (propertyId: string) => void
  onViewLeases: (propertyId: string) => void
  onViewFinancials: (propertyId: string) => void
}

export function PropertyCard({
  property,
  onEdit,
  onDelete,
  onViewTenants,
  onViewLeases,
  onViewFinancials,
}: PropertyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {property.name}
        </CardTitle>
        <PropertyActionsMenu
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewTenants={onViewTenants}
          onViewLeases={onViewLeases}
          onViewFinancials={onViewFinancials}
        />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Type</p>
            <Badge variant="secondary">
              {property.propertyType.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Monthly Rent</p>
            <p className="text-sm">{formatCurrency(property.monthlyRent)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Units</p>
            <p className="text-sm">{property.units}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}