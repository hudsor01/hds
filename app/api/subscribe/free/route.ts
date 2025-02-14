import { prisma } from '@/prisma/seed'

import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await supabase.auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const existingUser = await prisma.users.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        subscription_status: true
      }
    })

    if (!existingUser) {
      return new NextResponse('User not found', { status: 404 })
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: existingUser.id
      },
      data: {
        subscription_status: 'trialing',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      },
      select: {
        id: true,
        subscription_status: true,
        trialEndsAt: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to activate free trial:', error)
    return new NextResponse('Failed to activate free trial', { status: 500 })
  }
}
