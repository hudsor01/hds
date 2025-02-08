import type { ApiResponse } from '@/lib/api';
import { api } from '@/lib/api';
import type { PaymentMethod } from '@stripe/stripe-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface Payment {
  id: string;
  payment_date: string;
  payment_type: string;
  payment_amount: number;
  payment_status: string;
  property?: {
    name: string;
  };
  tenant?: {
    first_name: string;
    last_name: string;
  };
}

interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

export function usePaymentMethods() {
  return useQuery<ApiResponse<PaymentMethod[]>>({
    queryKey: ['payment-methods'],
    queryFn: () => api.get('/api/payments/methods'),
  });
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentMethod: PaymentMethod) => {
      const response = await api.post('/api/payments/methods', {
        payment_method_id: paymentMethod.id,
      });
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Payment method added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add payment method');
    },
  });
}

export function useRemovePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const response = await api.delete(
        '/api/payments/methods',
        paymentMethodId,
      );
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Payment method removed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove payment method');
    },
  });
}

export function useSetupRecurringPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      tenant_id: string;
      property_id: string;
      amount: number;
      frequency: 'monthly' | 'weekly' | 'yearly';
      payment_day: number;
      payment_method_id: string;
      description?: string;
    }) => {
      const response = await api.post('/api/payments/recurring', data);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-payments'] });
      toast.success('Recurring payment set up successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set up recurring payment');
    },
  });
}

export function useRecurringPayments(filters?: {
  tenant_id?: string;
  property_id?: string;
  status?: string;
}) {
  const queryString = filters
    ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : '';

  return useQuery<ApiResponse<Payment[]>>({
    queryKey: ['recurring-payments', filters],
    queryFn: () => api.get(`/api/payments/recurring${queryString}`),
  });
}

export function usePaymentHistory(filters?: {
  tenant_id?: string;
  property_id?: string;
  payment_type?: string;
  payment_status?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}) {
  const queryString = filters
    ? `?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : '';

  return useQuery<ApiResponse<Payment[]>>({
    queryKey: ['payment-history', filters],
    queryFn: () => api.get(`/api/payments/history${queryString}`),
  });
}
