'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { PropertyDialog } from '@/components/dashboard/property-dialog';
import { Button } from '@/components/ui/button';
import type { Property } from '@/types/properties';

import { useEffect, useState } from 'react';

import { useDashboardCrud } from '@/hooks/use-dashboard-crud';
import { useDashboardUpdates } from '@/hooks/use-dashboard-updates';

import { CrudContainer } from './crud-container';
import { PropertyCard } from './property-card';

export function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { create, update, remove, getAll, loading } = useDashboardCrud<Property>({
    table: 'properties',
    select: '*, units(*)',
    onSuccess: data => {
      if (Array.isArray(data)) {
        setProperties(data);
      }
    },
  });

  useDashboardUpdates({
    table: 'properties',
    select: '*, units(*)',
    onUpdate: (data: Property) => {
      setProperties(prev => prev.map(p => (p.id === data.id ? data : p)));
    },
    onDelete: (id: string) => {
      setProperties(prev => prev.filter(p => p.id !== id));
    },
  });

  useEffect(() => {
    void getAll();
  }, [getAll]);

  const handleAddProperty = () => {
    setDialogOpen(true);
  };

  const handleUpdateProperty = async (id: string, data: Partial<Property>) => {
    try {
      await update(id, data);
      toast({
        title: 'Success',
        description: 'Property updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update property',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await remove(id);
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    }
  };

  return (
    <CrudContainer<Property>
      table='properties'
      title='Properties'
      loading={loading}
      onItemCreated={item => setProperties(prev => [...prev, item])}
    >
      <div className='flex justify-end mb-4'>
        <Button onClick={handleAddProperty}>
          <PlusIcon className='h-4 w-4 mr-2' />
          Add Property
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            name={property.name}
            address={property.address}
            units={`${property.units.length} Units`}
            occupancy={`${property.units.filter(u => u.status === 'OCCUPIED').length}/${property.units.length}`}
            onEdit={() => handleUpdateProperty(property.id, property)}
            onDelete={() => handleDeleteProperty(property.id)}
          />
        ))}
      </div>
      <PropertyDialog
        open={dialogOpen}
        onOpenChangeAction={setDialogOpen}
        onSubmitAction={async propertyData => {
          try {
            await create(propertyData);
            setDialogOpen(false);
          } catch (error) {
            console.error('Failed to create property:', error);
          }
        }}
      />
    </CrudContainer>
  );
}
