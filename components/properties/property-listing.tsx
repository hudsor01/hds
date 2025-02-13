'use client'

import { Suspense, useState, useCallback, useMemo } from 'react'
import { Box, Button, Tab, Tabs, Typography, Container } from '@mui/material'
import {
  Add as AddIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material'
import { useProperties } from '@/hooks/data'
import { PropertyFilters } from './property-filters'
import { PropertyGrid } from './property-grid'
import { PropertyTable } from './property-table'
import { LoadingScreen } from '@/components/ui/feedback/loading-screen'
import { useRouter } from 'next/navigation'

type ViewType = 'grid' | 'table'

export function PropertyListing() {
  const router = useRouter()
  const [view, setView] = useState<ViewType>('grid')
  const { data: properties, isLoading, error } = useProperties()

  const handleViewChange = useCallback((_: React.SyntheticEvent, newValue: ViewType) => {
    setView(newValue)
  }, [])

  const handleAddProperty = useCallback(() => {
    router.push('/properties/new')
  }, [router])

  const propertyData = useMemo(() => properties?.data ?? [], [properties?.data])

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load properties. Please try again later.</Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Properties
            </Typography>
            <Suspense fallback={<Box sx={{ height: 42 }} />}>
              <PropertyFilters />
            </Suspense>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Tabs
              value={view}
              onChange={handleViewChange}
              sx={{ mr: 2 }}
              aria-label="view selection"
            >
              <Tab
                icon={<GridViewIcon />}
                value="grid"
                aria-label="grid view"
                sx={{ minWidth: 'auto' }}
              />
              <Tab
                icon={<ViewListIcon />}
                value="table"
                aria-label="table view"
                sx={{ minWidth: 'auto' }}
              />
            </Tabs>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProperty}
              sx={{
                height: 40,
                minWidth: 140
              }}
            >
              Add Property
            </Button>
          </Box>
        </Box>

        <Suspense fallback={<LoadingScreen message="Loading properties..." />}>
          {view === 'grid' ? (
            <PropertyGrid properties={propertyData} isLoading={isLoading} />
          ) : (
            <PropertyTable properties={propertyData} isLoading={isLoading} />
          )}
        </Suspense>
      </Box>
    </Container>
  )
}
