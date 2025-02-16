'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dropdown-menu'
import { Button } from '@/components/button'
import { Property, PropertyStatus } from '@/types/property'
import { formatCurrency } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/alert-dialog'
import { Badge } from '@/components/badge'

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
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(property)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeleteId(property.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
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

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
