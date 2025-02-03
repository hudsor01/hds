'use client';

import {useUser} from '@/app/auth/lib/auth/config';
import {supabase} from '@/app/auth/lib/supabase';
import {useDashboardCrud} from '@/app/hooks/use-dashboard-crud';
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {alpha, useTheme} from '@mui/material/styles';
import {PropertyDialog} from 'components/dialogs/property-dialog';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Edit2, Plus, Search, Trash2} from 'react-feather';
import type {Property, PropertyCardData} from 'types/properties';

const containerVariants = {
  initial: {opacity: 0},
  animate: {opacity: 1, transition: {staggerChildren: 0.1}},
};

const itemVariants = {
  initial: {y: 20, opacity: 0},
  animate: {y: 0, opacity: 1},
};

export default function PropertiesPage() {
  const theme = useTheme();
  const {user} = useUser();
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyCardData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const {data, error} = await supabase.from('properties').select('*, units(*)');

        if (error) throw error;

        if (data) {
          const transformedData: PropertyCardData[] = data.map(property => ({
            id: property.id,
            title: property.name,
            address: property.address,
            type: property.type || 'apartment',
            status: property.status || 'available',
            price: property.units[0]?.price || 0,
            bedrooms: property.units[0]?.bedrooms || 0,
            bathrooms: property.units[0]?.bathrooms || 0,
            image: property.image_url || '/properties/default.jpg',
          }));
          setProperties(transformedData);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    }

    void fetchProperties();
  }, []);

  const handleEdit = async (property: PropertyCardData) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const {remove: deleteProperty, loading: deleteLoading} = useDashboardCrud<Property>({
    table: 'properties',
    onSuccess: () => {
      setProperties(prev => prev.filter(p => p.id !== selectedProperty?.id));
    },
    onError: error => {
      console.error('Error deleting property:', error);
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const filteredProperties = properties.filter(
    property =>
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.address.toLowerCase().includes(search.toLowerCase()),
  );

  const convertToProperty = (cardData: PropertyCardData): Property => {
    const [street, cityState] = cardData.address.split(',');
    const [city, stateZip] = (cityState || '').trim().split(',');
    const [state, zipCode] = (stateZip || '').trim().split(' ');

    return {
      id: cardData.id,
      name: cardData.title,
      address: street || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      type: cardData.type,
      status: cardData.status,
      units: [
        {
          id: '1',
          number: '1',
          bedrooms: cardData.bedrooms,
          bathrooms: cardData.bathrooms,
          price: cardData.price,
          status: cardData.status,
          property_id: cardData.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      owner_id: '1', // Replace with actual owner ID
      organization_id: '1', // Replace with actual organization ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  return (
    <motion.div variants={containerVariants} initial='initial' animate='animate'>
      {/* Header */}
      <Box sx={{mb: 4}}>
        <Typography variant='h4' gutterBottom>
          Properties
        </Typography>
        <Typography color='text.secondary'>Manage your property portfolio</Typography>
      </Box>

      {/* Actions */}
      <Stack
        direction={{xs: 'column', sm: 'row'}}
        spacing={2}
        alignItems={{xs: 'stretch', sm: 'center'}}
        sx={{mb: 3}}
      >
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search properties...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          sx={{flex: 1}}
        />
        <Button
          variant='contained'
          startIcon={<Plus size={20} />}
          onClick={() => {
            setSelectedProperty(undefined);
            setOpenDialog(true);
          }}
          sx={{minWidth: 200}}
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
            src='/illustrations/no-data.svg'
            alt='No properties'
            width={180}
            height={180}
            style={{marginBottom: 16, opacity: 0.7}}
          />
          <Typography variant='h6' paragraph>
            No properties found
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Try adjusting your search or add a new property
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProperties.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
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
                  <Box sx={{pt: '75%', position: 'relative'}}>
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      style={{objectFit: 'cover'}}
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
                  <Box sx={{p: 3}}>
                    <Typography variant='subtitle1' noWrap paragraph>
                      {property.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' noWrap sx={{mb: 2}}>
                      {property.address}
                    </Typography>

                    <Stack direction='row' alignItems='center' spacing={3} sx={{mb: 2}}>
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <Typography variant='subtitle1'>${property.price}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          /month
                        </Typography>
                      </Stack>
                      <Stack direction='row' spacing={1}>
                        <Typography variant='body2'>{property.bedrooms} beds</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          •
                        </Typography>
                        <Typography variant='body2'>{property.bathrooms} baths</Typography>
                      </Stack>
                    </Stack>

                    <Stack direction='row' spacing={1}>
                      <Tooltip title='Edit'>
                        <IconButton
                          size='small'
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
                      <Tooltip title='Delete'>
                        <IconButton
                          size='small'
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
        onSubmitAction={async data => {
          try {
            const {create, update} = useDashboardCrud<Property>({
              table: 'properties',
              onSuccess: result => {
                setProperties(prev => {
                  if (selectedProperty) {
                    return prev.map(p =>
                      p.id === result.id
                        ? {
                            ...p,
                            title: result.name,
                            address: `${result.address}, ${result.city}, ${result.state} ${result.zipCode}`,
                            type: result.type,
                            status: result.status,
                          }
                        : p,
                    );
                  }
                  return [
                    ...prev,
                    {
                      id: result.id,
                      title: result.name,
                      address: `${result.address}, ${result.city}, ${result.state} ${result.zipCode}`,
                      type: result.type,
                      status: result.status,
                      price: data.units?.[0]?.price || 0,
                      bedrooms: data.units?.[0]?.bedrooms || 0,
                      bathrooms: data.units?.[0]?.bathrooms || 0,
                      image: '/properties/default.jpg',
                    },
                  ];
                });
                setOpenDialog(false);
              },
              onError: error => {
                console.error('Error saving property:', error);
              },
            });

            if (!user?.id) {
              throw new Error('User not authenticated');
            }

            const propertyData = {
              ...data,
              owner_id: user.id,
              organization_id: user.id, // Using user.id as organization_id
            } as const;

            if (selectedProperty) {
              await update(selectedProperty.id, propertyData);
            } else {
              await create(propertyData);
            }
          } catch (error) {
            console.error('Error saving property:', error);
          }
        }}
      />
    </motion.div>
  );
}
