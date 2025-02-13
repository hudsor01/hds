import { emailService } from '@/lib/utils/email'
import { prisma } from '@/prisma/seed'
import { NextResponse } from 'next/server'

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return 'healthy'
  } catch (error) {
    return 'unhealthy'
  }
}

async function checkEmailService() {
  try {
    await emailService.sendWelcome('test@example.com')
    return 'healthy'
  } catch (error) {
    return 'unhealthy'
  }
}

export async function GET() {
  const health = {
    uptime: process.uptime(),
    database: await checkDatabase(),
    email: await checkEmailService(),
    timestamp: Date.now()
  }

  const isHealthy = Object.values(health).every(
    status => status === 'healthy' || typeof status === 'number'
  )

  return NextResponse.json(health, {
    status: isHealthy ? 200 : 503
  })
}
