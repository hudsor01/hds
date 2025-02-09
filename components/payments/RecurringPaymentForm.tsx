'use client'

import { api } from '@/lib/api'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

interface RecurringPaymentFormProps {
  propertyId: string
  tenantId: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function RecurringPaymentForm({
  propertyId,
  tenantId,
  onSuccess,
  onCancel,
}: RecurringPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [frequency, setFrequency] = useState('monthly')
  const [paymentDay, setPaymentDay] = useState('1')
  const [amount, setAmount] = useState('')

  const { data: paymentMethods } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: () => api.get('/api/payments/methods'),
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post('/api/payments/recurring', {
        tenant_id: tenantId,
        property_id: propertyId,
        amount: parseFloat(amount),
        frequency,
        payment_day: parseInt(paymentDay, 10),
        payment_method_id: selectedPaymentMethod,
        description: `Recurring ${frequency} payment for property ${propertyId}`,
      })

      if (response.error) {
        toast.error(response.error.message || 'Failed to set up recurring payment')
        return
      }

      toast.success('Recurring payment set up successfully')
      onSuccess?.()
    } catch (error) {
      console.error('Error setting up recurring payment:', error)
      toast.error('Failed to set up recurring payment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Set Up Recurring Payment
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel>Frequency</InputLabel>
          <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Payment Day"
          type="number"
          value={paymentDay}
          onChange={(e) => setPaymentDay(e.target.value)}
          required
          inputProps={{
            min: frequency === 'weekly' ? 0 : 1,
            max: frequency === 'weekly' ? 6 : 31,
          }}
          helperText={
            frequency === 'weekly' ? '0 = Sunday, 6 = Saturday' : 'Day of the month (1-31)'
          }
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            {paymentMethods?.data?.map((method: any) => (
              <MenuItem key={method.id} value={method.id}>
                {method.card.brand} ending in {method.card.last4}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onCancel && (
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
            },
          }}
        >
          {isLoading ? 'Setting up...' : 'Set Up Recurring Payment'}
        </Button>
      </Box>
    </Box>
  )
}
