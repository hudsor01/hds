import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const tenantSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  leaseStart: z.string().min(1, 'Lease start date is required'),
  leaseEnd: z.string().min(1, 'Lease end date is required'),
  rentAmount: z.number().min(0, 'Rent amount must be positive'),
  status: z.enum(['active', 'pending', 'inactive'])
})

type TenantFormData = z.infer<typeof tenantSchema>

interface TenantDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: TenantFormData) => Promise<void>
  initialData?: Partial<TenantFormData>
  title?: string
}

export function TenantDialog({ open, onClose, onSubmit, initialData, title = 'Add New Tenant' }: TenantDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      leaseStart: '',
      leaseEnd: '',
      rentAmount: 0,
      status: 'pending',
      ...initialData
    }
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFormSubmit = async (data: TenantFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      handleClose()
    } catch (error) {
      console.error('Error submitting tenant form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Phone" error={!!errors.phone} helperText={errors.phone?.message} />
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="leaseStart"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Lease Start"
                    type="date"
                    error={!!errors.leaseStart}
                    helperText={errors.leaseStart?.message}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="leaseEnd"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Lease End"
                    type="date"
                    error={!!errors.leaseEnd}
                    helperText={errors.leaseEnd?.message}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
            </Stack>

            <Controller
              name="rentAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rent Amount"
                  type="number"
                  error={!!errors.rentAmount}
                  helperText={errors.rentAmount?.message}
                  InputProps={{
                    startAdornment: '$'
                  }}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
