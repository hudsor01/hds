'use client'

import { type Property } from '@/types/properties'
import { Grid, Box, Typography } from '@mui/material'
import { PropertyCard } from '@/components/properties/property-card'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { cn } from '@/lib/utils'

export interface PropertyGridProps {
  properties: Property[]
  isLoading?: boolean
  error?: Error | null
  className?: string
  onPropertyClick?: (property: Property) => void
  showActions?: boolean
  loadingCount?: number
}

export function PropertyGrid({
  properties,
  isLoading,
  error,
  className,
  onPropertyClick,
  showActions = true,
  loadingCount = 6
}: PropertyGridProps): JSX.Element {
  // Handle error state
  if (error) {
    return (
      <Box className="p-6 text-center">
        <Typography color="error" variant="h6" gutterBottom>
          Error loading properties
        </Typography>
        <Typography color="error.main" variant="body2">
          {error.message}
        </Typography>
      </Box>
    )
  }

  // Handle loading state
  if (isLoading) {
    return (
      <Grid container spacing={3} className={className}>
        {Array.from({ length: loadingCount }, (_, index) => (
          <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
            <PropertyCardSkeleton />
          </Grid>
        ))}
      </Grid>
    )
  }

  // Handle empty state
  if (!properties.length) {
    return (
      <Box className="p-6 text-center">
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No properties found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or add a new property
        </Typography>
      </Box>
    )
  }

  // Render property grid
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Grid container spacing={3} className={cn('w-full', className)}>
        {properties.map(property => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard property={property} showActions={showActions} onPropertyClick={onPropertyClick} />
          </Grid>
        ))}
      </Grid>
    </ErrorBoundary>
  )
}

function PropertyCardSkeleton(): JSX.Element {
  return (
    <Box className="bg-card h-full w-full overflow-hidden rounded-lg">
      <Box className="bg-muted aspect-video w-full animate-pulse" />
      <Box className="space-y-4 p-6">
        <Box className="space-y-2">
          <Box className="bg-muted h-4 w-3/4 animate-pulse rounded" />
          <Box className="bg-muted h-4 w-1/2 animate-pulse rounded" />
        </Box>
        <Box className="space-y-2 pt-4">
          <Box className="bg-muted h-6 w-1/3 animate-pulse rounded" />
          <Box className="bg-muted h-4 w-full animate-pulse rounded" />
        </Box>
        <Box className="flex gap-2 pt-2">
          <Box className="bg-muted h-8 w-20 animate-pulse rounded" />
          <Box className="bg-muted h-8 w-20 animate-pulse rounded" />
          <Box className="bg-muted h-8 w-20 animate-pulse rounded" />
        </Box>
      </Box>
    </Box>
  )
}

function ErrorMessage(): JSX.Element {
  return (
    <Box className="p-6 text-center">
      <Typography variant="h6" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary">
        There was an error loading the property grid. Please try refreshing the page.
      </Typography>
    </Box>
  )
}
