'use client';

import { Button } from '@/components/ui/buttons/button'
import
  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Property, PropertySale } from '@/types/property'
import { useState } from 'react'

interface PropertySaleDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  property: Property;
  onSubmitAction: (data: PropertySale) => Promise<void>;
}

export function PropertySaleDialog({
  open,
  onOpenChangeAction,
  property,
  onSubmitAction,
}: PropertySaleDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        propertyId: property.id,
        salePrice: formData.get('salePrice') as string,
        saleDate: formData.get('saleDate') as string,
        notes: formData.get('notes') as string,
      };

      await onSubmitAction(data);
      onOpenChangeAction(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Property Sale</DialogTitle>
          <DialogDescription>Record the sale details for {property.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='salePrice'>Sale Price</Label>
              <Input id='salePrice' name='salePrice' type='number' min='0' step='0.01' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='saleDate'>Sale Date</Label>
              <Input id='saleDate' name='saleDate' type='date' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='notes'>Notes</Label>
              <Input id='notes' name='notes' placeholder='Any additional details about the sale' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Recording...' : 'Record Sale'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
