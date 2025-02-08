'use client';

import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useProperties } from '../../hooks/data';
import { PropertyFilters } from './property-filters';
import { PropertyGrid } from './property-grid';
import { PropertyTable } from './property-table';

export function PropertyListing() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const { data: properties, isLoading } = useProperties();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <h1>Properties</h1>
          <PropertyFilters />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tabs
            value={view}
            onChange={(_, newValue) => setView(newValue)}
            sx={{ mr: 2 }}
          >
            <Tab icon={<GridViewIcon />} value="grid" aria-label="grid view" />
            <Tab
              icon={<ViewListIcon />}
              value="table"
              aria-label="table view"
            />
          </Tabs>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/properties/new"
          >
            Add Property
          </Button>
        </Box>
      </Box>

      {view === 'grid' ? (
        <PropertyGrid
          properties={properties?.data ?? []}
          isLoading={isLoading}
        />
      ) : (
        <PropertyTable
          properties={properties?.data ?? []}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}
