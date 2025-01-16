export const LEASE_STATUS = {
  active: 'active',
  pending: 'pending',
  expired: 'expired',
  terminated: 'terminated'
} as const

export const PAYMENT_FREQUENCY = {
  monthly: 'monthly',
  quarterly: 'quarterly',
  annually: 'annually'
} as const

export type Lease = {
  id: string
  propertyId: string
  propertyName: string
  unitId: string
  unitNumber: string
  tenantId: string
  tenantName: string
  startDate: Date
  endDate: Date
  rentAmount: number
  securityDeposit: number
  paymentFrequency: keyof typeof PAYMENT_FREQUENCY
  status: keyof typeof LEASE_STATUS
  documents: Array<{
    id: string
    name: string
    url: string
    uploadedAt: Date
  }>
  createdAt: Date
  updatedAt: Date
}
