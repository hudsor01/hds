'use client';

import {Button} from '@/components/ui/buttons/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from 'components/ui/dialog';
import {Input} from 'components/ui/input';
import {useState} from 'react';
import type {Property} from 'types/property';

interface PropertyDialogProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (data: Omit<Property, 'id' | 'units'>) => Promise<void>;
  initialData?: Partial<Property>;
}

export function PropertyDialog({
  open,
  onOpenChangeAction,
  onSubmitAction,
  initialData,
}: PropertyDialogProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitAction(formData);
    setFormData({name: '', address: ''});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Property' : 'Add New Property'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Input
              placeholder='Property Name'
              value={formData.name}
              onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
              required
            />
          </div>
          <div>
            <Input
              placeholder='Address'
              value={formData.address}
              onChange={e => setFormData(prev => ({...prev, address: e.target.value}))}
              required
            />
          </div>
          <div className='flex justify-end space-x-2'>
            <Button type='button' variant='outline' onClick={() => onOpenChangeAction(false)}>
              Cancel
            </Button>
            <Button type='submit'>{initialData ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
