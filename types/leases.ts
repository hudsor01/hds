import { z } from 'zod'

export const leaseFormSchema = z.object({})

export type LeaseFormData = z.infer<typeof leaseFormSchema>

export interface LeaseFormProps {
    initialData?: LeaseFormData
    onSuccess?: () => void
}

export function LeaseForm({
    initialData,
    onSuccess
}: LeaseFormProps) {
    console.log('Initial Data:', initialData)

    if (onSuccess) {
        onSuccess()
    }
}

export type Lease = {
    id?: string
    startDate: Date
    endDate: Date
    rentAmount: number
    securityDeposit: number
    status: 'active' | 'pending' | 'expired' | 'terminated'
    propertyId: string
    unitId: string
    tenantId: string
    paymentFrequency: 'monthly' | 'quarterly' | 'annually'
    utilityResponsibilities: {
        electricity: string
        water: string
        gas: string
        internet: string
    }
}
