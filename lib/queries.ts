import type { PaginationParams } from '@/lib/db'
import { getPaginatedResults, prisma } from '@/lib/db'
import type {
    PaymentStatus,
    PaymentType,
    Prisma
} from '@prisma/client'
import { MaintenanceRequest } from '@/types/db.types'

// Payment queries
export const getPaymentsByTenant = async (tenantId: string) => {
    return prisma.payments.findMany({
        where: { tenant_id: tenantId },
        orderBy: { created_at: 'desc' }
    })
}

export const getPaymentsByLease = async (leaseId: string) => {
    const lease = await prisma.leases.findUnique({
        where: { user_id: leaseId }
    })

    if (!lease) return []

    return prisma.payments.findMany({
        where: { tenant_id: lease.tenant_id },
        orderBy: { created_at: 'desc' }
    })
}

export const getPaginatedPayments = async (
    tenantId: string,
    params: PaginationParams & {
        status?: PaymentStatus
        type?: PaymentType
        startDate?: Date
        endDate?: Date
    }
) => {
    const where = {
        tenant_id: tenantId,
        ...(params.status && { payment_status: params.status }),
        ...(params.type && { payment_type: params.type }),
        ...(params.startDate &&
            params.endDate && {
                created_at: {
                    gte: params.startDate,
                    lte: params.endDate
                }
            })
    }

    return getPaginatedResults(
        (skip, take) =>
            prisma.payments.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take
            }),
        () => prisma.payments.count({ where }),
        params
    )
}

// Lease queries
export const getLeaseWithDetails = async (leaseId: string) => {
    return prisma.leases.findUnique({
        where: { user_id: leaseId },
        select: {
            user_id: true,
            tenant_id: true,
            property_id: true,
            start_date: true,
            end_date: true,
            rent_amount: true,
            depositAmount: true,
            payment_day: true,
            documents: true,
            created_at: true,
            lease_status: true
        }
    })
}

export const getActiveLeasesByProperty = async (
    propertyId: string
) => {
    return prisma.leases.findMany({
        where: {
            property_id: propertyId,
            lease_status: 'Active',
            end_date: {
                gte: new Date()
            }
        },
        select: {
            user_id: true,
            tenant_id: true,
            property_id: true,
            start_date: true,
            end_date: true,
            rent_amount: true,
            depositAmount: true,
            payment_day: true,
            lease_status: true
        },
        orderBy: { start_date: 'desc' }
    })
}

// Property queries
export const getPropertyWithDetails = async (propertyId: string) => {
    return prisma.properties.findUnique({
        where: { id: propertyId },
        select: {
            id: true,
            name: true,
            address: true,
            city: true,
            state: true,
            zip: true,
            type: true,
            status: true,
            rent_amount: true,
            amenities: true,
            images: true,
            bathrooms: true,
            bedrooms: true,
            size: true,
            tenants: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    phone: true,
                    tenant_status: true
                }
            },
            maintenance_requests: {
                where: {
                    maintenance_requests_status: 'PENDING'
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    requests_status: true,
                    priority: true,
                    created_at: true
                }
            },
            additional_details: {
                select: {
                    detail_id: true,
                    description: true
                }
            }
        }
    })
}

export const getPaginatedProperties = async (
    userId: string,
    params: PaginationParams & {
        status?: string
        type?: string
        search?: string
    }
) => {
    const where: Prisma.propertiesWhereInput = {
        user_id: userId,
        ...(params.status && { status: params.status }),
        ...(params.type && { type: params.type }),
        ...(params.search && {
            OR: [
                { name: { contains: params.search } },
                { address: { contains: params.search } },
                { city: { contains: params.search } }
            ]
        })
    }

    return getPaginatedResults(
        (skip, take) =>
            prisma.properties.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    address: true,
                    city: true,
                    state: true,
                    type: true,
                    status: true,
                    rent_amount: true,
                    tenants: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true
                        }
                    },
                    maintenance_requests: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            priority: true,
                            created_at: true
                        }
                    }
                },
                orderBy: { created_at: 'desc' },
                skip,
                take
            }),
        () => prisma.properties.count({ where }),
        params
    )
}
