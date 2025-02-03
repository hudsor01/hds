// types/lease.ts
export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  securityDeposit: number;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  termsAccepted: boolean;
  documents: LeaseDocument[];
  paymentFrequency: 'monthly' | 'quarterly' | 'annually';
  utilityResponsibilities: {
    electricity: 'tenant' | 'landlord';
    water: 'tenant' | 'landlord';
    gas: 'tenant' | 'landlord';
    internet: 'tenant' | 'landlord';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaseRenewalData {
  newEndDate: Date;
  newRentAmount?: number;
  additionalTerms?: string;
}

interface LeaseDocument {
  id: string;
  type: 'lease_agreement' | 'addendum' | 'termination_notice';
  url: string;
  uploadedAt: Date;
}
