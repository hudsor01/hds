'use server'

import { signIn } from '@/lib/auth/auth'
import { PropertyStats, RecentActivity } from '@/types/dashboard'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from './prisma'

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
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error) {
      const type = (error as { type: string }).type
      switch (type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }

  redirect('/dashboard')
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

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
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
    totalProperties: 12,
    occupiedProperties: 45,
    vacantProperties: 3,
    totalRevenue: 52000,
    revenueChange: 15.2,
    occupancyRate: 92,
    occupancyChange: 2.1
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
