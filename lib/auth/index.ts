import { UserRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/db.types'

interface User {
  id: string
  role: UserRole
  email: string
  name: string | null
  metadata?: {
    permissions?: string[]
  }
}

// Role-based access control
export async function checkRole(
  req: NextRequest,
  allowedRoles: UserRole[]
): Promise<NextResponse | null> {
  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value
          },
          set(name: string, value: string, options: { path: string }) {
            // Cookie setting is handled by middleware
          },
          remove(name: string, options: { path: string }) {
            // Cookie removal is handled by middleware
          }
        }
      }
    )

    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dbUser = await prisma.users.findUnique({
      where: { id: user.id },
      select: {
        role: true,
        permissions: true
      }
    })

    if (!dbUser || !allowedRoles.includes(dbUser.role as UserRole)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return null
  } catch (error) {
    console.error('Auth error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Permission checking
export async function checkPermission(
  req: NextRequest,
  permission: string
): Promise<NextResponse | null> {
  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value
          },
          set(name: string, value: string, options: { path: string }) {
            // Cookie setting is handled by middleware
          },
          remove(name: string, options: { path: string }) {
            // Cookie removal is handled by middleware
          }
        }
      }
    )

    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const dbUser = await prisma.users.findUnique({
      where: { id: user.id },
      select: {
        permissions: true
      }
    })

    if (!dbUser?.permissions?.includes(permission)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    return null
  } catch (error) {
    console.error('Permission error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Auth utilities
export async function getCurrentUser(req: NextRequest): Promise<User | null> {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: { path: string }) {
          // Cookie setting is handled by middleware
        },
        remove(name: string, options: { path: string }) {
          // Cookie removal is handled by middleware
        }
      }
    }
  )

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error || !user) return null

  const dbUser = await prisma.users.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
      permissions: true
    }
  })

  if (!dbUser) return null

  return {
    id: dbUser.id,
    role: dbUser.role as UserRole,
    email: dbUser.email,
    name: dbUser.name,
    metadata: {
      permissions: dbUser.permissions
    }
  }
}

export async function getCurrentUserRole(userId: string): Promise<UserRole> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { role: true }
  })
  return (user?.role as UserRole) || 'USER'
}

export async function updateUserRole(userId: string, role: UserRole, req: NextRequest) {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: { path: string }) {
          // Cookie setting is handled by middleware
        },
        remove(name: string, options: { path: string }) {
          // Cookie removal is handled by middleware
        }
      }
    }
  )

  // Update role in Prisma
  await prisma.users.update({
    where: { id: userId },
    data: { role }
  })

  // Update role in Supabase user metadata
  await supabase.auth.updateUser({
    data: { role }
  })
}
