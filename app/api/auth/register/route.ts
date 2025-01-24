import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists in public schema
    const existingPublicUser = await prisma.public_users.findUnique({
      where: { email }
    })

    if (existingPublicUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create auth user
    const authUser = await prisma.auth_users.create({
      data: {
        email,
        encrypted_password: hashedPassword,
        raw_user_meta_data: { name },
        email_confirmed_at: new Date(),
        confirmed_at: new Date(),
        raw_app_meta_data: {},
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    // Create public user
    await prisma.public_users.create({
      data: {
        id: authUser.id,
        email: email,
        name: name,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    // Remove sensitive data from response
    const { encrypted_password: _, ...userWithoutPassword } = authUser

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
