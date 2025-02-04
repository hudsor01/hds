export const LEASE_STATUS = {
  active: 'active',
  pending: 'pending',
  expired: 'expired',
  terminated: 'terminated',
} as const;

export const PAYMENT_FREQUENCY = {
  monthly: 'monthly',
  quarterly: 'quarterly',
  annually: 'annually',
} as const;

export type Lease = {
  tenant: any;
  id: string;
  propertyId: string;
  propertyName: string;
  tenantId: string;
  tenantName: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  securityDeposit: number;
  paymentFrequency: keyof typeof PAYMENT_FREQUENCY;
  status: keyof typeof LEASE_STATUS;
  documents: LeaseDocument[];
  createdAt: Date;
  updatedAt: Date;
  termsAccepted: boolean;
  utilityResponsibilities: {
    electricity: 'tenant' | 'landlord';
    water: 'tenant' | 'landlord';
    gas: 'tenant' | 'landlord';
    internet: 'tenant' | 'landlord';
  };
};

export interface LeaseDocument {
  id: string;
  type: 'lease_agreement' | 'addendum' | 'termination_notice';
  url: string;
  uploadedAt: Date;
}

export interface LeaseFormProps {
  initialData?: Partial<Lease>;
  onSuccess?: () => void;
}
