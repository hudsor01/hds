'use client'

import { api } from '@/lib/api'
import type { PaymentMethod, PaymentIntent } from '@stripe/stripe-js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Payment {
  id: string
  payment_date: string
  payment_type: string
  payment_amount: number
  payment_status: string
  property?: {
    name: string
  }
  tenant?: {
    first_name: string
    last_name: string
  }
}

interface PaginatedResponse<T> {
  data: T[]
  metadata: {
    total: number
    totalPages: number
    page: number
    limit: number
  }
}

interface UsePaymentMethodsFilters {
  type?: 'card' | 'ach_debit' | 'check' | 'cash' | 'bank_transfer'
  status?: 'active' | 'inactive' | 'pending_verification'
}

export function usePaymentMethods(filters?: UsePaymentMethodsFilters) {
  const queryKey = ['payment-methods', filters]

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get('/api/payments/methods', { params: filters })
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on validation errors
      if (error.message.includes('VALIDATION_ERROR')) return false
      return failureCount < 3
    }
  })
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { type: string; paymentMethodData: Record<string, unknown> }) => {
      const response = await api.post(`/api/payments/methods/${data.type}`, data.paymentMethodData)
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
      toast.success('Payment method added successfully')
    },
    onError: (error: Error) => {
      let message = 'Failed to add payment method'
      if (error.message.includes('VALIDATION_ERROR')) {
        message = 'Invalid payment method details'
      } else if (error.message.includes('DUPLICATE')) {
        message = 'This payment method has already been added'
      }
      toast.error(message)
    }
  })
}

export function useRemovePaymentMethod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { id: string; type: string }) => {
      const response = await api.delete(`/api/payments/methods/${data.type}`, {
        params: { id: data.id }
      })
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
      toast.success('Payment method removed successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove payment method')
    }
  })
}

interface CreatePaymentIntentData {
  amount: number
  currency?: string
  paymentMethodId: string
  description?: string
  metadata?: Record<string, string>
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: async (data: CreatePaymentIntentData) => {
      const response = await api.post('/api/payments/intent', data)
      if (response.error) throw new Error(response.error.message)
      return response.data as PaymentIntent
    },
    onError: (error: Error) => {
      let message = 'Failed to process payment'
      if (error.message.includes('INSUFFICIENT_FUNDS')) {
        message = 'Insufficient funds available'
      } else if (error.message.includes('CARD_DECLINED')) {
        message = 'Card was declined'
      }
      toast.error(message)
    }
  })
}

interface ConfirmPaymentIntentData {
  paymentIntentId: string
  paymentMethodId: string
}

export function useConfirmPaymentIntent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ConfirmPaymentIntentData) => {
      const response = await api.post('/api/payments/intent/confirm', data)
      if (response.error) throw new Error(response.error.message)
      return response.data as PaymentIntent
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-history'] })
    },
    onError: (error: Error) => {
      let message = 'Payment confirmation failed'
      if (error.message.includes('AUTHENTICATION_REQUIRED')) {
        message = 'Additional authentication required'
      }
      toast.error(message)
    }
  })
}

interface RefundPaymentData {
  paymentIntentId: string
  amount?: number
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
}

export function useRefundPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RefundPaymentData) => {
      const response = await api.post('/api/payments/refund', data)
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-history'] })
      toast.success('Payment refunded successfully')
    },
    onError: (error: Error) => {
      let message = 'Failed to process refund'
      if (error.message.includes('ALREADY_REFUNDED')) {
        message = 'Payment has already been refunded'
      }
      toast.error(message)
    }
  })
}

export function useSetupRecurringPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      tenant_id: string
      property_id: string
      amount: number
      frequency: 'monthly' | 'weekly' | 'yearly'
      payment_day: number
      payment_method_id: string
      description?: string
    }) => {
      const response = await api.post('/api/payments/recurring', data)
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring-payments'] })
      toast.success('Recurring payment set up successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to set up recurring payment')
    }
  })
}

export function useRecurringPayments(filters?: { tenant_id?: string; property_id?: string; status?: string }) {
  const queryString = filters ? `?${new URLSearchParams(filters as Record<string, string>).toString()}` : ''

  return useQuery<ApiResponse<Payment[]>>({
    queryKey: ['recurring-payments', filters],
    queryFn: () => api.get(`/api/payments/recurring${queryString}`)
  })
}

export function usePaymentHistory(filters?: {
  startDate?: string
  endDate?: string
  status?: string
  type?: string
  page?: number
  limit?: number
}) {
  const queryKey = ['payment-history', filters]

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get('/api/payments/history', { params: filters })
      if (response.error) throw new Error(response.error.message)
      return response.data
    },
    keepPreviousData: true, // Keep previous data while fetching new data
    retry: (failureCount, error) => {
      if (error.message.includes('VALIDATION_ERROR')) return false
      return failureCount < 3
    }
  })
}
