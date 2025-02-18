'use client'

import { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, useTheme } from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import Grid from '@mui/material/Grid2'

// Create motion components
const MotionCard = motion(Card)

interface PropertyCardProps {
  property: {
    id: string
    address: string
    city: string
    state: string
    zip: string
    beds: number
    baths: number
    sqft: number
    rent: number
    status: 'vacant' | 'occupied' | 'maintenance'
    imageUrl?: string
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const theme = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vacant':
        return theme.palette.error.main
      case 'occupied':
        return theme.palette.success.main
      case 'maintenance':
        return theme.palette.warning.main
      default:
        return theme.palette.info.main
    }
  }

  return (
    <MotionCard
      whileHover={{
        y: -8,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create(['box-shadow']),
        '&:hover': {
          boxShadow: theme.shadows[8]
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={property.imageUrl || '/placeholder-house.jpg'}
          alt={property.address}
          sx={{
            transition: theme.transitions.create(['transform']),
            ...(isHovered && {
              transform: 'scale(1.05)'
            })
          }}
        />
        <Chip
          label={property.status.toUpperCase()}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: getStatusColor(property.status),
            color: '#fff',
            fontWeight: 600
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" gutterBottom component="div" noWrap>
          {property.address}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
          {property.city}, {property.state} {property.zip}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid xs={4}>
            <Typography variant="body2" color="text.secondary">
              {property.beds} Beds
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="body2" color="text.secondary">
              {property.baths} Baths
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="body2" color="text.secondary">
              {property.sqft.toLocaleString()} sqft
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MoneyIcon sx={{ fontSize: 20, mr: 0.5 }} />${property.rent.toLocaleString()}/mo
          </Typography>

          <Box
            sx={{
              opacity: isHovered ? 1 : 0,
              transition: theme.transitions.create('opacity'),
              display: 'flex',
              gap: 1
            }}
          >
            {onEdit && (
              <IconButton
                size="small"
                onClick={() => {
                  onEdit(property.id)
                }}
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                onClick={() => {
                  onDelete(property.id)
                }}
                sx={{
                  color: theme.palette.error.main,
                  backgroundColor: theme.palette.error.light,
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </MotionCard>
  )
}
