'use client';

import { Plus } from 'react-feather';
import { toast } from 'sonner';

import { useEffect, useState } from 'react';

import { PropertyDialog } from '@/components/dashboard/property-dialog';
import { Button } from '@/components/ui/button';

import { useDashboardCrud } from '@/hooks/use-dashboard-crud';
import { useDashboardUpdates } from '@/hooks/use-dashboard-updates';

import type {
  CreatePropertyInput,
  Property,
  PropertyUnit,
  UpdatePropertyInput,
  PropertyStatus,
} from '@/types/properties';

import { CrudContainer } from './crud-container';
import { PropertyCard } from './property-card';

export function PropertyManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const { create, update, remove, getAll, loading } = useDashboardCrud<Property>({
    table: 'properties',
    select: '*, units(*)',
  });

  useDashboardUpdates({
    table: 'properties',
    onUpdate: (data: Property) => {
      setProperties(prev => prev.map(p => (p.id === data.id ? data : p)));
    },
    onDelete: (id: string) => {
      setProperties(prev => prev.filter(p => p.id !== id));
    },
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAll();
        if (data) setProperties(data);
      } catch (error) {
        toast.error('Failed to fetch properties');
      }
    };
    void fetchProperties();
  }, [getAll]);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setDialogOpen(true);
  };

  const handleUpdateProperty = async (property: Property, updateData: UpdatePropertyInput) => {
    try {
      await update(property.id, updateData);
      toast.success('Property updated successfully');
    } catch (error) {
      toast.error('Failed to update property');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await remove(id);
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const getOccupiedUnits = (units?: PropertyUnit[]) => {
    if (!units) return 0;
    return units.filter(unit => unit.status === 'OCCUPIED' as PropertyStatus).length;
  };

  const getTotalUnits = (units?: PropertyUnit[]) => {
    return units?.length || 0;
  };

  return (
    <CrudContainer
      table='properties'
      title='Properties'
      loading={loading}
      onItemCreated={item => setProperties(prev => [...prev, item as Property])}
    >
      <div className='flex justify-end mb-4'>
        <Button onClick={handleAddProperty}>
          <Plus className='h-4 w-4 mr-2' />
          Add Property
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            name={property.name}
            address={property.address}
            units={`${getTotalUnits(property.units)} Units`}
            occupancy={`${getOccupiedUnits(property.units)}/${getTotalUnits(property.units)}`}
            onEdit={() => {
              setSelectedProperty(property);
              setDialogOpen(true);
            }}
            onDelete={() => handleDeleteProperty(property.id)}
          />
        ))}
      </div>
      <PropertyDialog
        open={dialogOpen}
        onOpenChangeAction={open => {
          setDialogOpen(open);
          if (!open) setSelectedProperty(null);
        }}
        property={selectedProperty}
        onSubmitAction={async (data: CreatePropertyInput) => {
          try {
            if (selectedProperty) {
              await handleUpdateProperty(selectedProperty, data);
            } else {
              await create(data);
            }
            setDialogOpen(false);
            toast.success(`Property ${selectedProperty ? 'updated' : 'created'} successfully`);
          } catch (error) {
            toast.error(`Failed to ${selectedProperty ? 'update' : 'create'} property`);
          }
        }}
      />
    </CrudContainer>
  );
}
