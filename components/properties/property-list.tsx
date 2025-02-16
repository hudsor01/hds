'use client'

import { useState, useMemo } from 'react'
import {
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Typography
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from './property-card'
import { Search, Home } from 'react-feather'
import { type Property, type PropertyStatus } from '@/types/properties'
import { cn } from '@/lib/utils'

const MotionBox = motion(Box)

const statusOptions: { label: string; value: PropertyStatus | 'all' }[] = [
  { label: 'All Properties', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Rented', value: 'rented' },
  { label: 'Under Maintenance', value: 'maintenance' },
  { label: 'Listed', value: 'listed' },
  { label: 'Inactive', value: 'inactive' }
]

const filterAnimation = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
}

const listAnimation = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut'
    }
  }),
  hidden: {
    opacity: 0,
    y: 20
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

export interface PropertyListProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
  className?: string
  showFilters?: boolean
  animateEntrance?: boolean
  showActions?: boolean
}

export function PropertyList({
  properties,
  onPropertyClick,
  className,
  showFilters = true,
  animateEntrance = true,
  showActions = true
}: PropertyListProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all')

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch =
        !searchQuery ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || property.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [properties, searchQuery, statusFilter])

  if (!properties.length) {
    return (
      <Box className="py-8 text-center">
        <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <Typography variant="h6" gutterBottom>
          No properties found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first property to get started
        </Typography>
      </Box>
    )
  }

  return (
    <Box className={className}>
      {showFilters && (
        <MotionBox
          variants={filterAnimation}
          initial={animateEntrance ? 'hidden' : 'visible'}
          animate="visible"
          className="mb-6"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search properties..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Status"
                  onChange={e => setStatusFilter(e.target.value as PropertyStatus | 'all')}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </MotionBox>
      )}

      <Grid container spacing={3}>
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={property.id}
              component={motion.div}
              variants={listAnimation}
              initial={animateEntrance ? 'hidden' : 'visible'}
              animate="visible"
              exit="exit"
              custom={index}
              layout
            >
              <PropertyCard
                property={property}
                onPropertyClick={onPropertyClick}
                showActions={showActions}
                className="h-full"
              />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {filteredProperties.length === 0 && (
        <Box className="py-8 text-center">
          <Typography variant="body1" color="text.secondary">
            No properties match your search
          </Typography>
        </Box>
      )}
    </Box>
  )
}