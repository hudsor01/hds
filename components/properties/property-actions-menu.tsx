'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/dropdown-menu.tsx'
import { Button } from '@/components/button'
import type { Property } from '@/types/property'

interface PropertyActionsMenuProps {
  property: Property
  onEdit: (property: Property) => void
  onDelete: (propertyId: string) => void
  onViewTenantsAction: (propertyId: string) => void
  onViewLeases: (propertyId: string) => void
  onViewFinancials: (propertyId: string) => void
}

export function PropertyActionsMenu({
  property,
  onEdit,
  onDelete,
  onViewTenantsAction,
  onViewLeases,
  onViewFinancials
}: PropertyActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(property)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewTenantsAction(property.id)}>
          <Users className="mr-2 h-4 w-4" />
          View Tenants
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewLeases(property.id)}>
          <FileText className="mr-2 h-4 w-4" />
          View Leases
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewFinancials(property.id)}>
          <DollarSign className="mr-2 h-4 w-4" />
          View Financials
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(property.id)} className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
