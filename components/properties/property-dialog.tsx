'use client';

import { Button } from '@/components/ui/buttons/button';
import type { PropertyInsert, PropertyRow } from '@/types/property';
import { Dialog } from '@/components/ui/dialogs/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useState } from 'react';

interface PropertyDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  property?: PropertyRow;
  userId: string;
  onSubmitAction: (property: PropertyInsert) => Promise<void>;
}

export function PropertyDialog({
  open,
  onOpenChangeAction,
  property,
  userId,
  onSubmitAction,
}: PropertyDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const propertyData: PropertyInsert = {
        id: crypto.randomUUID(),
        name: formData.get('name') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip: formData.get('zip') as string,
        property_type: formData.get('property_type') as PropertyRow['property_type'],
        property_status: formData.get('property_status') as PropertyRow['property_status'],
        rent_amount: Number(formData.get('rent_amount')),
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSubmitAction(propertyData);
      onOpenChangeAction(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChangeAction(false)}
      title={property ? 'Edit Property' : 'Add Property'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Property Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={property?.name}
            required
            placeholder="Enter property name"
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            defaultValue={property?.address}
            required
            placeholder="Enter street address"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              defaultValue={property?.city}
              required
              placeholder="Enter city"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              defaultValue={property?.state}
              required
              placeholder="Enter state"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input
            id="zip"
            name="zip"
            defaultValue={property?.zip}
            required
            placeholder="Enter ZIP code"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="property_type">Property Type</Label>
            <Select name="property_type" defaultValue={property?.property_type} required>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="commercial">Commercial</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="property_status">Status</Label>
            <Select name="property_status" defaultValue={property?.property_status} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="sold">Sold</option>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="rent_amount">Monthly Rent</Label>
          <Input
            id="rent_amount"
            name="rent_amount"
            type="number"
            defaultValue={property?.rent_amount}
            required
            min={0}
            step={0.01}
            placeholder="Enter monthly rent"
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChangeAction(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : property ? 'Save Changes' : 'Add Property'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
