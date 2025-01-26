'use server'

import { prisma } from '@/lib/prisma'
import { PropertyStats, RecentActivity } from '@/types/dashboard'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { AuthService } from './auth/service'

const authService = new AuthService()

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await prisma.authUser.findUnique({
      where: { email }
    })

    if (!user) {
      return 'Invalid credentials.'
    }

    const passwordMatch = await bcrypt.compare(password, user.encrypted_password)
    if (!passwordMatch) {
      return 'Invalid credentials.'
    }

    // Create a new session
    await authService.createSession(
      user.id,
      'user-agent', // TODO: Get actual user agent
      'ip-address'  // TODO: Get actual IP address
    )

    redirect('/dashboard')
  } catch (error) {
    console.error('Authentication error:', error)
    return 'Something went wrong.'
  }
}

export async function register(prevState: unknown, formData: FormData) {
  try {
    const validatedFields = RegisterSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.issues[0].message
      }
    }

    const { name, email, password } = validatedFields.data

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return {
        error: 'User with this email already exists'
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create auth user first
    const authUser = await prisma.authUser.create({
      data: {
        email,
        encrypted_password: hashedPassword,
        raw_user_meta_data: { name },
        email_confirmed_at: new Date(),
        confirmation_sent_at: new Date()  // Changed from confirmed_at
      }
    })

    // Then create public user with same ID
    await prisma.user.create({
      data: {
        id: authUser.id,
        name,
        email,
        emailVerified: new Date()
      }
    })

    return { success: true }
  } catch (error) {
    return { error: `Action failed: ${error instanceof Error ? error.message : 'Unknown error'}` }
  }
}

// Simulated data for demonstration
export async function getDashboardStats(): Promise<PropertyStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    overview: {
      totalProperties: 12,
      occupiedUnits: 45,
      vacantUnits: 3,
      totalUnits: 48,
      underMaintenance: 2
    },

    occupancy: {
      rate: 93.75, // (45 occupied / 48 total) * 100
      trend: 2.1,
      historicalRates: [
        { period: '2024-02', rate: 91.65 },
        { period: '2024-03', rate: 93.75 }
      ],
      byPropertyType: {
        'apartment': 95,
        'house': 92,
        'condo': 94
      }
    },

    financial: {
      revenue: {
        amount: 52000,
        currency: 'USD',
        period: 'MONTHLY',
        previousAmount: 45140,
        percentageChange: 15.2,
        breakdown: {
          'rent': 48000,
          'fees': 2500,
          'other': 1500
        }
      },
      expenses: {
        amount: 15000,
        currency: 'USD',
        period: 'MONTHLY',
        previousAmount: 14000,
        percentageChange: 7.1
      },
      netIncome: {
        amount: 37000,
        currency: 'USD',
        period: 'MONTHLY',
        previousAmount: 31140,
        percentageChange: 18.8
      },
      outstanding: {
        amount: 3200,
        currency: 'USD',
        period: 'MONTHLY'
      },
      projections: {
        nextMonth: {
          amount: 53500,
          currency: 'USD',
          period: 'MONTHLY'
        },
        nextQuarter: {
          amount: 162000,
          currency: 'USD',
          period: 'QUARTERLY'
        }
      }
    },

    tenants: {
      total: 52,
      active: 45,
      pending: 3,
      moveIns: 2,
      moveOuts: 1,
      satisfactionRate: 4.2
    },

    maintenance: {
      openTickets: 8,
      resolvedTickets: 45,
      averageResolutionTime: 48, // hours
      byPriority: {
        'CRITICAL': 1,
        'HIGH': 3,
        'MEDIUM': 2,
        'LOW': 2
      },
      byStatus: {
        'PENDING': 2,
        'IN_PROGRESS': 4,
        'COMPLETED': 45,
        'CANCELLED': 1,
        'ON_HOLD': 1
      }
    },

    leases: {
      active: 45,
      expiringSoon: 3,
      renewed: 12,
      newLeases: 5,
      averageTerm: 12 // months
    },

    trends: {
      occupancy: [91, 92, 93, 93.75],
      revenue: [48000, 49500, 45140, 52000],
      expenses: [14000, 14500, 14000, 15000],
      satisfaction: [4.0, 4.1, 4.0, 4.2]
    },

    alerts: [
      {
        type: 'MAINTENANCE',
        message: 'Critical repair needed in Unit 204',
        priority: 'HIGH',
        timestamp: new Date().toISOString()
      }
    ]
  }
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      type: 'MAINTENANCE',
      title: 'New Tenant Application',
      description: 'John Doe submitted an application for Sunset Apartments',
      timestamp: new Date().toISOString(),
      status: 'PENDING',
      priority: 'MEDIUM'
    },
    {
      id: '2',
      type: 'MAINTENANCE',
      title: 'Maintenance Request',
      description: 'Plumbing issue reported in Unit 204',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'IN_PROGRESS',
      priority: 'HIGH'
    },
    {
      id: '3',
      type: 'PAYMENT',
      title: 'Rent Payment',
      description: 'Received payment for Unit 301 - March 2024',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'COMPLETED',
      amount: 1500
    }
  ]
}
