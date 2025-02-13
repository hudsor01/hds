'use client'

import { useState } from 'react'
import { Grid, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyCard } from './property-card'
import { listAnimation, filterAnimation } from '@/lib/property-animations'
import { useAnimation } from '@/components/providers/animation-provider'
import { type PropertyListProps, type Property } from '@/types'
import { useIntl } from 'react-intl'

const MotionBox = motion(Box)

export function PropertyList({ properties, onEditProperty }: PropertyListProps) {
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { reduceMotion } = useAnimation()
  const intl = useIntl()

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.name.toLowerCase().includes(filter.toLowerCase()) ||
      property.address.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!properties.length) {
    return (
      <div className="py-8 text-center">
        <p>{intl.formatMessage({ id: 'property.noProperties' })}</p>
      </div>
    )
  }

  return (
    <Box>
      <MotionBox variants={filterAnimation} initial={false} animate="visible" sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search properties"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={e => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Properties</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="rented">Rented</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MotionBox>

      <Grid container spacing={3}>
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <motion.div
                variants={listAnimation}
                initial={reduceMotion ? 'visible' : 'hidden'}
                animate="visible"
                exit="exit"
                custom={index}
                layout
              >
                <PropertyCard
                  property={property}
                  onEdit={onEditProperty}
                  index={index}
                  isFeatured={property.revenue > 5000}
                />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  )
}
