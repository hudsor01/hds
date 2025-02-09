import { FormInput, FormSelect } from '@/components/forms/mui/form-fields';
import { FormContainer } from '@/components/forms/mui/form-provider';
import { useCreateProperty } from '@/hooks/data';
import { propertySchema } from '@/lib/validations/schemas';
import { PROPERTY_STATUS, PROPERTY_TYPES } from '@/types/property';
import type { PropertyInsert } from '@/types/property';
import { Button, Stack } from '@mui/material';
import { z } from 'zod';

const propertyTypes = Object.entries(PROPERTY_TYPES).map(([value, label]) => ({
  label,
  value,
}));

const propertyStatuses = Object.entries(PROPERTY_STATUS).map(([value, label]) => ({
  label,
  value,
}));

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  userId: string;
}

export function PropertyForm({ userId }: PropertyFormProps) {
  const { mutateAsync: createProperty, isPending } = useCreateProperty();

  const handleSubmit = async (data: PropertyFormData) => {
    const propertyData: PropertyInsert = {
      ...data,
      id: crypto.randomUUID(),
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await createProperty(propertyData);
  };

  return (
    <FormContainer<typeof propertySchema>
      schema={propertySchema}
      defaultValues={{
        property_status: 'active',
        property_type: 'apartment',
        rent_amount: 0,
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <FormInput name="name" label="Property Name" />
        <FormInput name="address" label="Address" multiline rows={2} />
        <FormInput name="city" label="City" />
        <FormInput name="state" label="State" />
        <FormInput name="zip" label="ZIP Code" />
        <FormSelect name="property_type" label="Property Type" options={propertyTypes} />
        <FormInput
          name="rent_amount"
          label="Monthly Rent"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
        />
        <FormSelect name="property_status" label="Status" options={propertyStatuses} />
        <FormInput name="description" label="Description" multiline rows={4} />
        <Button type="submit" variant="contained" disabled={isPending} fullWidth>
          Create Property
        </Button>
      </Stack>
    </FormContainer>
  );
}
