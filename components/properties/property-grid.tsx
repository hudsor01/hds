'use client'

import { type PropertyRow } from '@/types'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Menu,
  MenuItem,
  Skeleton
} from '@mui/material'
import { ErrorBoundary } from '@/components/error/error-boundary'
import { useState } from 'react'

interface PropertyGridProps {
  properties: PropertyRow[]
  isLoading: boolean
  onEdit?: (property: PropertyRow) => void
  onViewDetails?: (property: PropertyRow) => void
  onManageTenants?: (property: PropertyRow) => void
  error?: Error
}

export function PropertyGrid({
  properties,
  isLoading,
  onEdit,
  onViewDetails,
  onManageTenants,
  error
}: PropertyGridProps) {
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error loading properties: {error.message}</Typography>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PropertyCardSkeleton />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (!properties.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>No properties found</Typography>
      </Box>
    )
  }

  return (
    <ErrorBoundary>
      <Grid container spacing={3}>
        {properties.map(property => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard
              property={property}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              onManageTenants={onManageTenants}
            />
          </Grid>
        ))}
      </Grid>
    </ErrorBoundary>
  )
}

interface PropertyCardProps {
  property: PropertyRow
  onEdit?: (property: PropertyRow) => void
  onViewDetails?: (property: PropertyRow) => void
  onManageTenants?: (property: PropertyRow) => void
}

function PropertyCard({ property, onEdit, onViewDetails, onManageTenants }: PropertyCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200"
        image="/placeholder-property.jpg"
        alt={property.name}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box>
            <Typography variant="h6" component="h2">
              {property.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {property.address}
            </Typography>
          </Box>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="primary">
            {formatCurrency(property.rent_amount)}
            <Typography component="span" variant="body2" color="text.secondary">
              /month
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Chip
            label={property.property_status}
            color={
              property.property_status === 'active'
                ? 'success'
                : property.property_status === 'inactive'
                  ? 'error'
                  : 'warning'
            }
            size="small"
          />
          {property.property_type && (
            <Chip label={property.property_type} size="small" variant="outlined" />
          )}
        </Box>
      </CardContent>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {onEdit && (
          <MenuItem
            onClick={() => {
              handleCloseMenu()
              onEdit(property)
            }}
          >
            Edit
          </MenuItem>
        )}
        {onViewDetails && (
          <MenuItem
            onClick={() => {
              handleCloseMenu()
              onViewDetails(property)
            }}
          >
            View Details
          </MenuItem>
        )}
        {onManageTenants && (
          <MenuItem
            onClick={() => {
              handleCloseMenu()
              onManageTenants(property)
            }}
          >
            Manage Tenants
          </MenuItem>
        )}
      </Menu>
    </Card>
  )
}

function PropertyCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="40%" />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" width="30%" height={40} />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={80} height={24} />
          <Skeleton variant="rectangular" width={80} height={24} />
        </Box>
      </CardContent>
    </Card>
  )
}
