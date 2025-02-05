import {PaymentStatus, PaymentType} from '@prisma/client';
import {z} from 'zod';

// Schema for payment validation
export const paymentSchema = z.object({
  leaseId: z.string().uuid('Invalid lease ID'),
  payment_amount: z.number().positive('Amount must be greater than 0'),
  payment_type: z.nativeEnum(PaymentType),
  description: z.string().optional(),
});

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
