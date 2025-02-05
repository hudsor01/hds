import {PaymentStatus, PaymentType} from '@prisma/client';
import {z} from 'zod';

// Schema for payment validation
export const paymentSchema = z.object({
  leaseId: z.string().uuid('Invalid lease ID'),
  payment_amount: z.number().positive('Amount must be greater than 0'),
  payment_type: z.nativeEnum(PaymentType),
  description: z.string().optional(),
});

// Common payment types
export type PaymentRequest = z.infer<typeof paymentSchema>;

export interface PaymentResponse {
  clientSecret: string;
}

export interface PaymentError {
  error: string | z.ZodError;
}

export interface PaymentMetadata {
  leaseId: string;
  propertyId: string;
  tenantId: string;
  payment_type: PaymentType;
}

export interface PaymentRecord {
  tenant_id: string;
  payment_amount: number;
  payment_status: PaymentStatus;
  payment_type: PaymentType;
  description?: string;
  payment_intent_id: string;
  error_message?: string;
  processed_at?: Date;
}

// Payment history filters
export interface PaymentHistoryFilters {
  leaseId?: string;
  status?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  paymentType?: PaymentType;
}

// Payment summary
export interface PaymentSummary {
  totalPaid: number;
  totalDue: number;
  balance: number;
  lastPaymentDate?: Date;
  nextPaymentDue?: Date;
}

// Stripe-specific payment types
export interface StripePaymentMetadata extends PaymentMetadata {
  userId: string;
  customerEmail?: string;
}

export interface StripeWebhookPayload {
  type: string;
  data: {
    object: Record<string, any>;
  };
}
