import { FormInput, FormSelect } from '@/components/forms/mui/form-fields';
import { FormContainer } from '@/components/forms/mui/form-provider';
import { useCreateProperty } from '@/hooks/data';
import { propertySchema } from '@/lib/validations/schemas';
import type { PropertyInsert } from '@/types/property';
import { Button, Stack } from '@mui/material';
import { z } from 'zod';

const propertyTypes: Array<{ label: string; value: string }> = [
	{ label: 'Apartment', value: 'apartment' },
	{ label: 'House', value: 'house' },
	{ label: 'Condo', value: 'condo' },
	{ label: 'Townhouse', value: 'townhouse' },
	{ label: 'Commercial', value: 'commercial' },
];

const propertyStatuses: Array<{ label: string; value: string }> = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
	{ label: 'Maintenance', value: 'maintenance' },
	{ label: 'Sold', value: 'sold' },
];

type PropertyFormData = z.infer<typeof propertySchema>;

export function PropertyForm() {
	const { mutateAsync: createProperty, isPending } = useCreateProperty();

	const handleSubmit = async (data: PropertyFormData) => {
		const propertyData: PropertyInsert = {
			...data,
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
