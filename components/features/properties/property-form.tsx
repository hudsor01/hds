import {FormInput, FormSelect} from '@/components/shared/forms/form-fields';
import {FormContainer} from '@/components/shared/forms/form-provider';
import {useCreateProperty} from '@/hooks/data';
import {propertySchema} from '@/lib/validations/schemas';
import {LoadingButton} from '@mui/lab';
import {Stack} from '@mui/material';
import {z} from 'zod';

const propertyTypes = [
  {label: 'Apartment', value: 'APARTMENT'},
  {label: 'House', value: 'HOUSE'},
  {label: 'Condo', value: 'CONDO'},
  {label: 'Commercial', value: 'COMMERCIAL'},
] as const;

const propertyStatus = [
  {label: 'Vacant', value: 'VACANT'},
  {label: 'Occupied', value: 'OCCUPIED'},
  {label: 'Maintenance', value: 'MAINTENANCE'},
] as const;

type PropertyFormData = z.infer<typeof propertySchema>;

export function PropertyForm() {
  const {mutateAsync: createProperty, isPending} = useCreateProperty();

  return (
    <FormContainer<typeof propertySchema>
      schema={propertySchema}
      defaultValues={{
        status: 'VACANT',
      }}
      onSubmit={async (data: PropertyFormData) => {
        await createProperty(data);
      }}
    >
      <Stack spacing={3}>
        <FormInput name='name' label='Property Name' />
        <FormInput name='address' label='Address' multiline rows={2} />
        <FormSelect name='type' label='Property Type' options={propertyTypes} />
        <FormInput
          name='rentAmount'
          label='Monthly Rent'
          type='number'
          inputProps={{min: 0, step: 0.01}}
        />
        <FormSelect name='status' label='Status' options={propertyStatus} />
        <FormInput name='description' label='Description' multiline rows={4} />
        <LoadingButton type='submit' variant='contained' loading={isPending} fullWidth>
          Create Property
        </LoadingButton>
      </Stack>
    </FormContainer>
  );
}
