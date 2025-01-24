import { prisma } from '@/auth/lib/prisma'
import type { sessions as Session } from '@prisma/client'
import { nanoid } from 'nanoid'
import { UAParser } from 'ua-parser-js'

export type { Session }

export class AuthService {
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static async setupTwoFactor(userId: string): Promise<{ secret: string; qrCode: string }> {
    // Implementation will be added later
    throw new Error('Not implemented')
  }

  async createSession(
    userId: string,
    userAgent: string,
    ipAddress: string
  ): Promise<Session> {
    const parser = new UAParser(userAgent)
    const browser = `${parser.getBrowser().name || 'unknown'} ${parser.getBrowser().version || ''}`
    const os = parser.getOS().name || 'unknown'
    const device = parser.getDevice().type || 'desktop'

    const session = await prisma.sessions.create({
      data: {
        user_id: userId,
        session_token: nanoid(32),
        device,
        browser,
        operating_system: os,
        ip_address: ipAddress,
        expires: new Date(Date.now() + this.SESSION_DURATION),
        last_active: new Date(),
        is_revoked: false,
      },
    })

    return session
  }

  async getSessions(userId: string): Promise<Session[]> {
    return prisma.sessions.findMany({
      where: {
        user_id: userId,
        is_revoked: false,
        expires: { gt: new Date() },
      },
      orderBy: { last_active: 'desc' },
    })
  }

  async revokeSession(sessionId: string): Promise<void> {
    await prisma.sessions.update({
      where: { id: sessionId },
      data: { is_revoked: true },
    })
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    await prisma.sessions.update({
      where: { id: sessionId },
      data: { last_active: new Date() },
    })
  }

  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date()
    await prisma.sessions.deleteMany({
      where: {
        OR: [
          { expires: { lt: now } },
          { is_revoked: true },
        ],
      },
    })
  }
}
