import type { Database } from '@/types/db.types'
import { PaymentStatus, PaymentType, Prisma, PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

// Prisma Client Initialization
declare global {
  var prisma: PrismaClient | undefined
}

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty' as const
}

export const prisma = globalThis.prisma || new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Supabase Client Initialization
export const supabase = createClient<Database>(process.env['NEXT_PUBLIC_SUPABASE_URL'], process.env['NEXT_PUBLIC_SUPABASE_KEY']!)

// Error Handling
const mapPrismaErrorToHttpStatus = (error: Prisma.PrismaClientKnownRequestError): number => {
  switch (error.code) {
    case 'P2002': // Unique constraint violation
      return 409
    case 'P2025': // Record not found
      return 404
    case 'P2003': // Foreign key constraint violation
      return 400
    default:
      return 500
  }
}

export const handlePrismaError = (error: unknown) => {
  console.error('Database Error:', error)
  if (error instanceof Error) {
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError
    return {
      error: error.message,
      code: isPrismaError ? mapPrismaErrorToHttpStatus(error) : 500
    }
  }
  return { error: 'An unexpected error occurred', code: 500 }
}

// Pagination Types & Utilities
export interface PaginationParams {
  page?: number
  limit?: number
  orderBy?: Record<string, 'asc' | 'desc'>
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getPaginatedResults<T>(
  query: (skip: number, take: number) => Promise<T[]>,
  countQuery: () => Promise<number>,
  params: PaginationParams
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, params.page || 1)
  const limit = Math.min(100, Math.max(1, params.limit || 10))
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([query(skip, limit), countQuery()])

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }
}

// Payment Queries
export const payments = {
  getByTenant: async (tenantId: string) => {
    return prisma.payments.findMany({
      where: { tenant_id: tenantId },
      orderBy: { created_at: 'desc' }
    })
  },

  getByLease: async (leaseId: string) => {
    const lease = await prisma.leases.findUnique({
      where: { user_id: leaseId }
    })

    if (!lease) return []

    return prisma.payments.findMany({
      where: { tenant_id: lease.tenant_id },
      orderBy: { created_at: 'desc' }
    })
  },

  getPaginated: async (
    tenantId: string,
    params: PaginationParams & {
      status?: PaymentStatus
      type?: PaymentType
      startDate?: Date
      endDate?: Date
    }
  ): Promise<PaginatedResult<Prisma.paymentsGetPayload<{}>>> => {
    const where: Prisma.paymentsWhereInput = {
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
}

// Lease Queries
export const leases = {
  getWithDetails: async (leaseId: string): Promise<Prisma.leasesGetPayload<{}> | null> => {
    return prisma.leases.findUnique({
      where: { user_id: leaseId },
      select: {
        user_id: true,
        tenant_id: true,
        property_id: true,
        lease_type: true,
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
  },

  getActiveByProperty: async (propertyId: string): Promise<Prisma.leasesGetPayload<{}>[]> => {
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
        lease_type: true,
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
}

// Property Queries
export const properties = {
  getWithDetails: async (propertyId: string): Promise<Prisma.propertiesGetPayload<{}> | null> => {
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
            status: 'PENDING'
          },
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            created_at: true
          }
        }
      }
    })
  },

  getPaginated: async (
    userId: string,
    params: PaginationParams & {
      status?: string
      type?: string
      search?: string
    }
  ): Promise<PaginatedResult<Prisma.propertiesGetPayload<{}>>> => {
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
                last_name: true,
                status: true
              }
            },
            maintenance_requests: {
              where: { request_status: 'PENDING' },
              select: {
                id: true,
                title: true,
                status: true,
                priority: true
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
}

// Connection Management
export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect()
}

export const connect = async (): Promise<void> => {
  await prisma.$connect()
}
