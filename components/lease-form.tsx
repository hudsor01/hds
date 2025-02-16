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
import { ErrorBoundary } from '@/components/error-boundary'

const leaseFormSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  rentAmount: z.coerce.number().positive(),
  securityDeposit: z.coerce.number().positive(),
  status: z.enum(['active', 'pending', 'expired', 'terminated']),
  propertyId: z.string(),
  unitId: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  paymentFrequency: z.enum(['monthly', 'quarterly', 'annually'])
})

type LeaseFormData = z.infer<typeof leaseFormSchema>

export function LeaseForm({ initialData, onSuccess }: LeaseFormProps) {
  const createLease = useCreateLease()
  const updateLease = useUpdateLease()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LeaseFormData>({
    resolver: zodResolver(leaseFormSchema),
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

  const startDate = watch('startDate')

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
    <ErrorBoundary>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  minDate={new Date()}
                  disabled={isSubmitting}
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
                  minDate={startDate || new Date()}
                  disabled={isSubmitting || !startDate}
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

          {/* ...existing utility fields... */}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : initialData ? 'Update Lease' : 'Create Lease'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </ErrorBoundary>
  )
}
