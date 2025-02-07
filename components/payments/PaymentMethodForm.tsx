'use client';

import {api} from '@/lib/api';
import {Box, Button, Typography} from '@mui/material';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {useState} from 'react';
import {toast} from 'sonner';

interface PaymentMethodFormProps {
  onSuccess?: (paymentMethod: any) => void;
  onCancel?: () => void;
}

export default function PaymentMethodForm({onSuccess, onCancel}: PaymentMethodFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Save the payment method to your backend
      const response = await api.post('/api/payments/methods', {
        payment_method_id: paymentMethod.id,
      });

      if (response.error) {
        toast.error(response.error.message || 'Failed to save payment method');
        return;
      }

      toast.success('Payment method added successfully');
      onSuccess?.(paymentMethod);
    } catch (error) {
      console.error('Error saving payment method:', error);
      toast.error('Failed to save payment method');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{width: '100%', maxWidth: 400}}>
      <Typography variant='h6' gutterBottom>
        Add Payment Method
      </Typography>

      <Box sx={{mb: 3}}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </Box>

      <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
        {onCancel && (
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button
          type='submit'
          variant='contained'
          disabled={!stripe || isLoading}
          sx={{
            background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
            },
          }}
        >
          {isLoading ? 'Saving...' : 'Save Payment Method'}
        </Button>
      </Box>
    </Box>
  );
}
