'use client'

import { api } from '@/lib/api'
import type { PaymentMethodType } from '@/types/payments'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'

interface PaymentMethodFormProps {
  onSuccess?: (paymentMethod: unknown) => void
  onCancel?: () => void
  defaultType?: PaymentMethodType
}

export default function PaymentMethodForm({
  onSuccess,
  onCancel,
  defaultType = 'card'
}: PaymentMethodFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentType, setPaymentType] = useState<PaymentMethodType>(defaultType)
  const [formData, setFormData] = useState({
    bank_name: '',
    account_holder: '',
    routing_number: '',
    account_number: '',
    account_type: 'checking',
    account_holder_type: 'individual',
    check_number: '',
    receipt_number: '',
    received_by: '',
    notes: '',
    swift_bic: '',
    iban: '',
    reference: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      let paymentMethod

      switch (paymentType) {
        case 'card':
          if (!stripe || !elements) {
            toast.error('Stripe not initialized')
            return
          }
          const { error, paymentMethod: stripeMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)!
          })
          if (error) {
            toast.error(error.message)
            return
          }
          paymentMethod = stripeMethod
          break

        case 'ach_debit':
          // Create ACH payment method
          const achData = {
            type: 'ach_debit',
            ach_debit: {
              bank_name: formData.bank_name,
              routing_number: formData.routing_number,
              account_number: formData.account_number,
              account_type: formData.account_type,
              account_holder_type: formData.account_holder_type
            }
          }
          const achResponse = await api.post('/api/payments/methods/ach', achData)
          if (achResponse.error) throw new Error(achResponse.error.message)
          paymentMethod = achResponse.data
          break

        case 'check':
          // Save check payment method
          const checkData = {
            type: 'check',
            check: {
              bank_name: formData.bank_name,
              account_holder: formData.account_holder,
              check_number: formData.check_number,
              routing_number: formData.routing_number,
              account_number: formData.account_number
            }
          }
          const checkResponse = await api.post('/api/payments/methods/check', checkData)
          if (checkResponse.error) throw new Error(checkResponse.error.message)
          paymentMethod = checkResponse.data
          break

        case 'cash':
          // Save cash payment method
          const cashData = {
            type: 'cash',
            cash: {
              receipt_number: formData.receipt_number,
              received_by: formData.received_by,
              notes: formData.notes
            }
          }
          const cashResponse = await api.post('/api/payments/methods/cash', cashData)
          if (cashResponse.error) throw new Error(cashResponse.error.message)
          paymentMethod = cashResponse.data
          break

        case 'bank_transfer':
          // Save bank transfer payment method
          const bankData = {
            type: 'bank_transfer',
            bank_transfer: {
              bank_name: formData.bank_name,
              account_holder: formData.account_holder,
              swift_bic: formData.swift_bic,
              iban: formData.iban,
              routing_number: formData.routing_number,
              account_number: formData.account_number,
              reference: formData.reference
            }
          }
          const bankResponse = await api.post('/api/payments/methods/bank', bankData)
          if (bankResponse.error) throw new Error(bankResponse.error.message)
          paymentMethod = bankResponse.data
          break
      }

      toast.success('Payment method added successfully')
      onSuccess?.(paymentMethod)
    } catch (error) {
      console.error('Error saving payment method:', error)
      toast.error('Failed to save payment method')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Add Payment Method
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Payment Type</InputLabel>
        <Select
          value={paymentType}
          label="Payment Type"
          onChange={e => setPaymentType(e.target.value as PaymentMethodType)}
        >
          <MenuItem value="card">Credit/Debit Card</MenuItem>
          <MenuItem value="ach_debit">ACH Direct Debit</MenuItem>
          <MenuItem value="check">Check</MenuItem>
          <MenuItem value="cash">Cash</MenuItem>
          <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
        </Select>
      </FormControl>

      {paymentType === 'card' ? (
        <Box sx={{ mb: 3 }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* ACH Fields */}
          {paymentType === 'ach_debit' && (
            <>
              <TextField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Routing Number"
                name="routing_number"
                value={formData.routing_number}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Account Number"
                name="account_number"
                value={formData.account_number}
                onChange={handleInputChange}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Account Type</InputLabel>
                <Select
                  name="account_type"
                  value={formData.account_type}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      account_type: e.target.value
                    }))
                  }
                >
                  <MenuItem value="checking">Checking</MenuItem>
                  <MenuItem value="savings">Savings</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Account Holder Type</InputLabel>
                <Select
                  name="account_holder_type"
                  value={formData.account_holder_type}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      account_holder_type: e.target.value
                    }))
                  }
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="compunknown">Compunknown</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {/* Check Fields */}
          {paymentType === 'check' && (
            <>
              <TextField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Account Holder"
                name="account_holder"
                value={formData.account_holder}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Check Number"
                name="check_number"
                value={formData.check_number}
                onChange={handleInputChange}
              />
            </>
          )}

          {/* Cash Fields */}
          {paymentType === 'cash' && (
            <>
              <TextField
                label="Receipt Number"
                name="receipt_number"
                value={formData.receipt_number}
                onChange={handleInputChange}
              />
              <TextField
                label="Received By"
                name="received_by"
                value={formData.received_by}
                onChange={handleInputChange}
              />
              <TextField
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </>
          )}

          {/* Bank Transfer Fields */}
          {paymentType === 'bank_transfer' && (
            <>
              <TextField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Account Holder"
                name="account_holder"
                value={formData.account_holder}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="SWIFT/BIC"
                name="swift_bic"
                value={formData.swift_bic}
                onChange={handleInputChange}
              />
              <TextField
                label="IBAN"
                name="iban"
                value={formData.iban}
                onChange={handleInputChange}
              />
              <TextField
                label="Reference"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
              />
            </>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onCancel && (
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || isLoading}
          sx={{
            background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
            }
          }}
        >
          {isLoading ? 'Saving...' : 'Save Payment Method'}
        </Button>
      </Box>
    </Box>
  )
}
