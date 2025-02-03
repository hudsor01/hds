// components/properties/property-grid.tsx
import {formatCurrency} from '@/lib/utils';
import {type Property} from '@/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import {useState} from 'react';

interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
}

export function PropertyGrid({properties, isLoading}: PropertyGridProps) {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PropertyCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {properties.map(property => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}

function PropertyCard({property}: {property: Property}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{height: '100%'}}>
      <CardMedia
        component='img'
        height='200'
        image={property.images[0] || '/placeholder-property.jpg'}
        alt={property.name}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography variant='h6' component='h2'>
              {property.name}
            </Typography>
            <Typography color='text.secondary' gutterBottom>
              {property.address}
            </Typography>
          </Box>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Box sx={{mt: 2}}>
          <Typography variant='h5' color='primary'>
            {formatCurrency(property.rentAmount)}
            <Typography component='span' variant='body2' color='text.secondary'>
              /month
            </Typography>
          </Typography>
        </Box>

        <Box sx={{mt: 2, display: 'flex', gap: 1}}>
          <Chip
            label={property.status}
            color={
              property.status === 'Occupied'
                ? 'success'
                : property.status === 'Vacant'
                  ? 'error'
                  : 'warning'
            }
            size='small'
          />
          {property.type && <Chip label={property.type} size='small' variant='outlined' />}
        </Box>
      </CardContent>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            // Add edit handler
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            // Add view details handler
          }}
        >
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            // Add manage tenants handler
          }}
        >
          Manage Tenants
        </MenuItem>
      </Menu>
    </Card>
  );
}

function PropertyCardSkeleton() {
  return (
    <Card>
      <Skeleton variant='rectangular' height={200} />
      <CardContent>
        <Skeleton variant='text' width='60%' height={32} />
        <Skeleton variant='text' width='40%' />
        <Box sx={{mt: 2}}>
          <Skeleton variant='text' width='30%' height={40} />
        </Box>
        <Box sx={{mt: 2, display: 'flex', gap: 1}}>
          <Skeleton variant='rectangular' width={80} height={24} />
          <Skeleton variant='rectangular' width={80} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
}
