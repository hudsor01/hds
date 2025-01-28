'use server';

import { compare, hash } from 'bcryptjs';
import { z } from 'zod';

import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { AuthService } from './auth/service';

const authService = new AuthService();

const RegisterSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return 'Please provide both email and password.';
    }

    const user = await prisma.authUser.findUnique({
      where: { email: email.toString() },
    });

    if (!user) {
      return 'Invalid credentials.';
    }

    if (!user.encrypted_password) {
      return 'Account requires password reset.';
    }

    const passwordMatch = await compare(password, user.encrypted_password);
    if (!passwordMatch) {
      return 'Invalid email or password.';
    }

    // Create a new session
    await authService.createSession(
      user.id,
      'user-agent', // TODO: Get actual user agent
      'ip-address', // TODO: Get actual IP address
    );

    redirect('/dashboard');
  } catch (error) {
    console.error('Authentication error:', error);
    return 'Something went wrong.';
  }
}

export async function register(prevState: unknown, formData: FormData) {
  try {
    const validatedFields = RegisterSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.issues[0].message,
      };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: 'User with this email already exists',
      };
    }

    const hashedPassword = await hash(password, 10);

    // Create auth user first
    const authUser = await prisma.authUser.create({
      data: {
        email,
        encrypted_password: hashedPassword,
        raw_user_meta_data: { name },
        email_confirmed_at: new Date(),
        confirmation_sent_at: new Date(), // Changed from confirmed_at
      },
    });

    // Then create public user with same ID
    await prisma.user.create({
      data: {
        id: authUser.id,
        name,
        email,
        emailVerified: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    return { error: `Action failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

// Rest of the file remains unchanged...
