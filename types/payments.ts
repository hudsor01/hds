import { PaymentStatus, PaymentType } from '@prisma/client'
import type { Stripe } from 'stripe'
import { z } from 'zod'

// Schema for payment validation
export const paymentSchema = z.object({
  leaseId: z.string().uuid('Invalid lease ID'),
  payment_amount: z.number().positive('Amount must be greater than 0'),
  payment_type: z.nativeEnum(PaymentType),
  description: z.string().optional(),
})

// Common payment types
export type PaymentRequest = z.infer<typeof paymentSchema>

export interface PaymentResponse {
  clientSecret: string
}

export interface PaymentError {
  error: string | z.ZodError
}

export interface PaymentMetadata {
  leaseId: string
  propertyId: string
  tenantId: string
  payment_type: PaymentType
}

export interface PaymentRecord {
  tenant_id: string
  payment_amount: number
  payment_status: PaymentStatus
  payment_type: PaymentType
  description?: string
  payment_intent_id: string
  error_message?: string
  processed_at?: Date
}

// Payment history filters
export interface PaymentHistoryFilters {
  leaseId?: string
  status?: PaymentStatus
  startDate?: Date
  endDate?: Date
  paymentType?: PaymentType
}

// Payment summary
export interface PaymentSummary {
  totalPaid: number
  totalDue: number
  balance: number
  lastPaymentDate?: Date
  nextPaymentDue?: Date
}

// Stripe-specific payment types
export interface StripePaymentMetadata extends PaymentMetadata {
  userId: string
  customerEmail?: string
}

export interface StripeWebhookPayload {
  type: string
  data: {
    object: Record<string, any>
  }
}

export type PaymentMethodType = 'card' | 'ach_debit' | 'check' | 'cash' | 'bank_transfer'

export interface PaymentMethodDetails {
  type: PaymentMethodType
  status: 'active' | 'inactive' | 'pending_verification'
  created_at: string
  last_used?: string
  metadata?: Record<string, any>
}

export interface CardPaymentMethod extends PaymentMethodDetails {
  type: 'card'
  card: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
    funding: string
  }
}

export interface ACHPaymentMethod extends PaymentMethodDetails {
  type: 'ach_debit'
  ach_debit: {
    bank_name: string
    last4: string
    routing_number: string
    account_type: 'checking' | 'savings'
    account_holder_type: 'individual' | 'company'
    status: 'verified' | 'pending' | 'failed'
  }
}

export interface CheckPaymentMethod extends PaymentMethodDetails {
  type: 'check'
  check: {
    bank_name: string
    account_holder: string
    check_number?: string
    routing_number?: string
    account_number?: string
  }
}

export interface CashPaymentMethod extends PaymentMethodDetails {
  type: 'cash'
  cash: {
    receipt_number?: string
    received_by?: string
    notes?: string
  }
}

export interface BankTransferPaymentMethod extends PaymentMethodDetails {
  type: 'bank_transfer'
  bank_transfer: {
    bank_name: string
    account_holder: string
    swift_bic?: string
    iban?: string
    routing_number?: string
    account_number?: string
    reference?: string
  }
}

export type PaymentMethod =
  | CardPaymentMethod
  | ACHPaymentMethod
  | CheckPaymentMethod
  | CashPaymentMethod
  | BankTransferPaymentMethod

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: Stripe.PaymentIntent.Status
  payment_method_types: PaymentMethodType[]
  payment_method?: string
  client_secret?: string
  metadata?: Record<string, any>
  created: number
  canceled_at?: number
  cancellation_reason?: string
  description?: string
}

export interface PaymentMethodRequirements {
  card: {
    required: ['card_number', 'exp_month', 'exp_year', 'cvc']
    optional: ['billing_address']
  }
  ach_debit: {
    required: [
      'bank_name',
      'routing_number',
      'account_number',
      'account_type',
      'account_holder_type',
    ]
    optional: ['billing_address']
  }
  check: {
    required: ['bank_name', 'account_holder']
    optional: ['check_number', 'routing_number', 'account_number']
  }
  cash: {
    required: []
    optional: ['receipt_number', 'received_by', 'notes']
  }
  bank_transfer: {
    required: ['bank_name', 'account_holder']
    optional: ['swift_bic', 'iban', 'routing_number', 'account_number', 'reference']
  }
}
