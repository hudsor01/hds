import {FormInput, FormSelect} from '@/components/forms/form-fields';
import {FormContainer} from '@/components/forms/form-provider';
import {useCreateProperty} from '@/hooks/data';
import {propertySchema} from '@/lib/validations/schemas';
import {Stack} from '@mui/material';

const propertyTypes = [
  {label: 'Apartment', value: 'APARTMENT'},
  {label: 'House', value: 'HOUSE'},
  {label: 'Condo', value: 'CONDO'},
  {label: 'Commercial', value: 'COMMERCIAL'},
];

const propertyStatus = [
  {label: 'Vacant', value: 'VACANT'},
  {label: 'Occupied', value: 'OCCUPIED'},
  {label: 'Maintenance', value: 'MAINTENANCE'},
];

export function PropertyForm() {
  const {mutateAsync: createProperty, isLoading} = useCreateProperty();

  return (
    <FormContainer
      schema={propertySchema}
      defaultValues={{
        status: 'VACANT',
      }}
      onSubmit={async data => {
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
      </Stack>
    </FormContainer>
  );
}
