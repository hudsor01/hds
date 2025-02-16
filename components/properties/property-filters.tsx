'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyType, PropertyStatus } from '@/types/property'

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void
}

export interface PropertyFilters {
  search: string
  propertyType?: PropertyType
  status?: PropertyStatus
  minRent?: number
  maxRent?: number
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
  })

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Input
        placeholder="Search properties..."
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />
      <Select
        value={filters.propertyType}
        onValueChange={(value) => handleFilterChange('propertyType', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Types</SelectItem>
          {Object.values(PropertyType).map((type) => (
            <SelectItem key={type} value={type}>
              {type.replace('_', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.status}
        onValueChange={(value) => handleFilterChange('status', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          {Object.values(PropertyStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status.replace('_', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min Rent"
          value={filters.minRent || ''}
          onChange={(e) => handleFilterChange('minRent', e.target.valueAsNumber)}
        />
        <Input
          type="number"
          placeholder="Max Rent"
          value={filters.maxRent || ''}
          onChange={(e) => handleFilterChange('maxRent', e.target.valueAsNumber)}
        />
      </div>
    </div>
  )
}