'use client'

import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/core/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/button'
import { Property, PropertyStatus } from '@/types/property'
import { Badge } from '@/components/ui/badge'

interface PropertyTableProps {
  properties: Property[]
  onEdit: (property: Property) => void
  onDelete: (propertyId: string) => Promise<void>
}

export function PropertyTable({ properties, onEdit, onDelete }: PropertyTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      await onDelete(deleteId)
    } catch (error) {
      console.error('Error deleting property:', error)
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return 'bg-green-500'
      case PropertyStatus.INACTIVE:
        return 'bg-gray-500'
      case PropertyStatus.MAINTENANCE:
        return 'bg-yellow-500'
      case PropertyStatus.VACANT:
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Monthly Rent</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map(property => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{`${property.address}, ${property.city}, ${property.state} ${property.zipCode}`}</TableCell>
                <TableCell>{property.propertyType.replace('_', ' ')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('capitalize', getStatusColor(property.status))}>
                    {property.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(property.monthlyRent)}</TableCell>
                <TableCell className="text-right">{formatCurrency(property.currentValue)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    {/* Add the correct DropdownMenuTrigger here */}
                    <Button variant="ghost" size="icon" />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          onEdit(property)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setDeleteId(property.id)
                        }}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
