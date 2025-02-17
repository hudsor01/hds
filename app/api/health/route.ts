import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/seed'
import { emailService } from '@/lib/utils/email'
import { handleError } from '../lib/error-handler'
import { withRateLimit } from '../lib/middleware'

async function checkDatabase(): Promise<string> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return 'healthy'
  } catch (error) {
    return 'unhealthy'
  }
}

async function checkEmailService(): Promise<string> {
  try {
    await emailService.sendWelcome('test@example.com')
    return 'healthy'
  } catch (error) {
    return 'unhealthy'
  }
}

export async function GET(request: Request) {
  try {
    return await withRateLimit(async () => {
      const health = {
        uptime: process.uptime(),
        database: await checkDatabase(),
        email: await checkEmailService(),
        timestamp: Date.now()
      }

      const isHealthy = Object.values(health).every(status => status === 'healthy' || typeof status === 'number')

      return NextResponse.json(health, {
        status: isHealthy ? 200 : 503
      })
    })(request)
  } catch (error) {
    return handleError(error)
  }
}
