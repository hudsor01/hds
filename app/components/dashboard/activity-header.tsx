'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ACTIVITY_FILTERS, type ActivityType } from '@/lib/constants'
import * as React from 'react'
import { Download, Search } from 'react-feather'

interface ActivityHeaderProps {
  filter: ActivityType | 'ALL'
  onFilterChangeAction: (value: ActivityType | 'ALL') => void
  searchQuery: string
  onSearchChangeAction: (value: string) => void
  onExportAction: () => void
}

export function ActivityHeader({
  filter,
  onFilterChangeAction,
  searchQuery,
  onSearchChangeAction,
  onExportAction
}: ActivityHeaderProps) {
  const handleFilterChange = (_: React.MouseEvent, value: string | undefined) => {
    if (value) {
      onFilterChangeAction(value as ActivityType | 'ALL')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Button variant="outline" size="sm" onClick={onExportAction}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => onSearchChangeAction(e.target.value)}
            className="pl-8"
          />
        </div>

        <ToggleGroup
          defaultValue={filter}
          onChange={handleFilterChange}
        >
          {ACTIVITY_FILTERS.map((filter) => (
            <ToggleGroupItem key={filter.value} value={filter.value}>
              {filter.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}
