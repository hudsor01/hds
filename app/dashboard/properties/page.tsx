'use client'

import type { Property, PropertyCardData } from '@/auth/lib/types/properties'
import { PropertyDialog } from '@/components/dialogs/property-dialog'
import { Box, Button, Card, Chip, Grid, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Edit2, Plus, Search, Trash2 } from 'react-feather'

// Mock data - replace with your actual data fetching
const mockProperties: PropertyCardData[] = [
  {
    id: '1',
    title: 'Luxury Apartment',
    address: '123 Main St, New York, NY 10001',
    type: 'apartment',
    status: 'available',
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    image: '/properties/apartment-1.jpg'
  },
  {
    id: '2',
    title: 'Modern House',
    address: '456 Park Ave, Los Angeles, CA 90001',
    type: 'house',
    status: 'rented',
    price: 3500,
    bedrooms: 3,
    bathrooms: 2.5,
    image: '/properties/house-1.jpg'
  }
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 }
}

export default function PropertiesPage() {
  const theme = useTheme()
  const [search, setSearch] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardData | undefined>()

  const handleEdit = (property: PropertyCardData) => {
    setSelectedProperty(property)
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    // Add your delete logic here
    console.log('Delete property:', id)
  }

  const filteredProperties = mockProperties.filter(
    property =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.address.toLowerCase().includes(search.toLowerCase())
  )

  const convertToProperty = (cardData: PropertyCardData): Property => {
    const [street, cityState] = cardData.address.split(',')
    const [city, stateZip] = (cityState || '').trim().split(',')
    const [state, zipCode] = (stateZip || '').trim().split(' ')

    return {
      id: cardData.id,
      name: cardData.title,
      address: street || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      type: cardData.type,
      status: cardData.status,
      units: [{
        id: '1',
        number: '1',
        bedrooms: cardData.bedrooms,
        bathrooms: cardData.bathrooms,
        price: cardData.price,
        status: cardData.status,
        property_id: cardData.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      owner_id: '1', // Replace with actual owner ID
      organization_id: '1', // Replace with actual organization ID
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Properties
        </Typography>
        <Typography color="text.secondary">
          Manage your property portfolio
        </Typography>
      </Box>

      {/* Actions */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        sx={{ mb: 3 }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search properties..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => {
            setSelectedProperty(undefined)
            setOpenDialog(true)
          }}
          sx={{ minWidth: 200 }}
        >
          Add Property
        </Button>
      </Stack>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <Card
          sx={{
            py: 10,
            textAlign: 'center',
            borderStyle: 'dashed',
            bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <Image
            src="/illustrations/no-data.svg"
            alt="No properties"
            width={180}
            height={180}
            style={{ marginBottom: 16, opacity: 0.7 }}
          />
          <Typography variant="h6" paragraph>
            No properties found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or add a new property
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid key={property.id} item xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    height: '100%',
                    '&:hover': {
                      boxShadow: 16,
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Property Image */}
                  <Box sx={{ pt: '75%', position: 'relative' }}>
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Chip
                      label={property.status}
                      color={property.status === 'available' ? 'success' : 'primary'}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  {/* Property Details */}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" noWrap paragraph>
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 2 }}>
                      {property.address}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle1">
                          ${property.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          /month
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="body2">
                          {property.bedrooms} beds
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          •
                        </Typography>
                        <Typography variant="body2">
                          {property.bathrooms} baths
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(property)}
                          sx={{
                            color: 'primary.main',
                            bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                            '&:hover': {
                              bgcolor: theme => alpha(theme.palette.primary.main, 0.16),
                            },
                          }}
                        >
                          <Edit2 size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(property.id)}
                          sx={{
                            color: 'error.main',
                            bgcolor: theme => alpha(theme.palette.error.main, 0.08),
                            '&:hover': {
                              bgcolor: theme => alpha(theme.palette.error.main, 0.16),
                            },
                          }}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <PropertyDialog
        open={openDialog}
        onOpenChangeAction={setOpenDialog}
        property={selectedProperty ? convertToProperty(selectedProperty) : undefined}
        onSubmitAction={async (data: Omit<Property, 'id' | 'created_at' | 'owner_id' | 'organization_id'>) => {
          // Add your submit logic here
          console.log('Submit property:', data)
          setOpenDialog(false)
        }}
      />
    </motion.div>
  )
}
