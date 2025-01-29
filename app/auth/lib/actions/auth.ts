'use server';

import { AuthService } from '@/auth/lib/auth/service';
import { sendVerificationEmail } from '@/auth/lib/email';
import { generateVerificationToken } from '@/auth/lib/tokens';
import { SignupFormData as RegisterFormData } from '@/auth/lib/validations/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { redirect } from 'next/navigation';

import { createSession } from '@/lib/session';

import { type RecentActivity } from '../types/dashboard';

const prisma = new PrismaClient();

const authService = new AuthService();

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return {
        errors: {
          email: ['Please provide both email and password'],
          password: ['Please provide both email and password'],
        },
      };
    }

    const user = await prisma.authUser.findUnique({
      where: { email },
    });

    if (!user || !user.encrypted_password) {
      return {
        message: 'Invalid email or password',
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.encrypted_password);
    if (!passwordMatch) {
      return {
        message: 'Invalid email or password',
      };
    }

    // Create a new session using JWT
    await createSession(user.id, user.email);

    redirect('/dashboard');
  } catch (error) {
    return {
      message: 'An error occurred. Please try again.',
    };
  }
}

export async function register(data: RegisterFormData): Promise<{ success: boolean }> {
  const { name, email, password } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      emailVerified: null,
    },
  });

  // Generate verification token
  const verificationToken = await generateVerificationToken(email);

  // Send verification email
  await sendVerificationEmail(email, verificationToken.token);

  return { success: true };
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  // TODO: Implement actual data fetching from your database
  // This is a mock implementation for now
  return [
    {
      id: '1',
      type: 'APPLICATION',
      title: 'New Rental Application',
      description: 'John Doe submitted a rental application for 123 Main St',
      timestamp: new Date().toISOString(),
      status: 'pending',
      propertyId: 'prop_1',
      applicationId: 'app_1',
    },
    {
      id: '2',
      type: 'MAINTENANCE',
      title: 'Maintenance Request',
      description: 'Plumbing issue reported at 456 Oak Ave',
      timestamp: new Date().toISOString(),
      status: 'completed',
      propertyId: 'prop_2',
      maintenanceId: 'maint_1',
    },
    {
      id: '3',
      type: 'PAYMENT',
      title: 'Rent Payment Received',
      description: 'Monthly rent payment received from tenant',
      timestamp: new Date().toISOString(),
      status: 'completed',
      amount: 1500,
      propertyId: 'prop_3',
      tenantId: 'tenant_1',
      paymentId: 'pay_1',
    },
  ];
}
