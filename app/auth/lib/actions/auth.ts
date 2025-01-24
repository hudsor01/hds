'use server'

import { sendVerificationEmail } from '@/auth/lib/email'
import { prisma } from '@/auth/lib/prisma'
import { generateVerificationToken } from '@/auth/lib/tokens'
import { SignupFormData as RegisterFormData } from '@/auth/lib/validations/auth'
import bcrypt from 'bcryptjs'

export async function register(data: RegisterFormData): Promise<{ success: boolean }> {
  const { name, email, password } = data

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('Email already registered')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: null
    }
  })

  // Generate verification token
  const verificationToken = await generateVerificationToken(email)

  // Send verification email
  await sendVerificationEmail(
    email,
    verificationToken.token
  )

  return { success: true }
}
