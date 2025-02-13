'use client'

import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { withAnimation } from '@/components/animations/with-animation'
import { dataUpdateAnimation } from '@/lib/property-animations'
import { Edit, Star, LocationOn } from '@mui/icons-material'

const MotionCard = motion(Card)

interface PropertyCardProps {
  property: {
    id: string
    name: string
    address: string
    status: 'available' | 'rented' | 'maintenance'
    units: number
    revenue: number
  }
  onEdit: (id: string) => void
  isFeatured?: boolean
  index?: number
}

function PropertyCardContent({
  property,
  onEdit,
  isFeatured = false,
  index = 0
}: PropertyCardProps) {
  const statusColors = {
    available: 'success',
    rented: 'primary',
    maintenance: 'warning'
  }

  return (
    <MotionCard
      variants={dataUpdateAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      sx={{ position: 'relative' }}
    >
      {isFeatured && (
        <Star
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'warning.main'
          }}
        />
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ mr: 1, fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            {property.address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label={property.status} color={statusColors[property.status] as any} size="small" />
          <Typography variant="body2">{property.units} units</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${property.revenue.toLocaleString()}/mo
          </Typography>
          <IconButton onClick={() => onEdit(property.id)} size="small" aria-label="edit property">
            <Edit />
          </IconButton>
        </Box>
      </CardContent>
    </MotionCard>
  )
}

export const PropertyCard = withAnimation(PropertyCardContent, 'fade')
