import type { LeaseFormProps } from '@/types'
import { useCreateLease, useUpdateLease } from '@/hooks/use-leases'
import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const leaseSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  tenantId: z.string().min(1, 'Tenant is required'),
  startDate: z.date(),
  endDate: z.date(),
  rentAmount: z.number().min(0),
  securityDeposit: z.number().min(0),
  paymentFrequency: z.enum(['monthly', 'quarterly', 'annually']),
  utilityResponsibilities: z.object({
    electricity: z.enum(['tenant', 'landlord']),
    water: z.enum(['tenant', 'landlord']),
    gas: z.enum(['tenant', 'landlord']),
    internet: z.enum(['tenant', 'landlord'])
  })
})

type LeaseFormData = z.infer<typeof leaseSchema>

export function LeaseForm({ initialData, onSuccess }: LeaseFormProps) {
  const createLease = useCreateLease()
  const updateLease = useUpdateLease()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LeaseFormData>({
    resolver: zodResolver(leaseSchema),
    defaultValues: initialData || {
      paymentFrequency: 'monthly',
      utilityResponsibilities: {
        electricity: 'tenant',
        water: 'tenant',
        gas: 'tenant',
        internet: 'tenant'
      }
    }
  })

  const onSubmit = async (data: LeaseFormData) => {
    try {
      if (initialData?.id) {
        await updateLease.mutateAsync({ id: initialData.id, ...data })
      } else {
        await createLease.mutateAsync(data)
      }
      onSuccess?.()
    } catch (error) {
      console.error('Failed to save lease:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="propertyId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property"
                select
                fullWidth
                error={!!errors.propertyId}
                helperText={errors.propertyId?.message}
              >
                {/* Property options would come from API */}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="tenantId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tenant"
                select
                fullWidth
                error={!!errors.tenantId}
                helperText={errors.tenantId?.message}
              >
                {/* Tenant options would come from API */}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start Date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.startDate,
                    helperText: errors.startDate?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="End Date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.endDate,
                    helperText: errors.endDate?.message
                  }
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={createLease.isPending || updateLease.isPending}
            >
              {initialData ? 'Update Lease' : 'Create Lease'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
