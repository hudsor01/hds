import { prisma } from "@/lib/prisma"
import type { Session } from '@supabase/supabase-js'
import { nanoid } from "nanoid"
import { UAParser } from 'ua-parser-js'

export class AuthService {
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  async createSession(
    userId: string,
    userAgent: string,
    ipAddress: string
  ): Promise<Session> {
    const parser = new UAParser(userAgent)
    const browser = `${parser.getBrowser().name || 'unknown'} ${parser.getBrowser().version || ''}`
    const os = parser.getOS().name || 'unknown'
    const device = parser.getDevice().type || 'desktop'

    const session = await prisma.session.create({
      data: {
        userId,
        sessionToken: nanoid(32),
        device,
        browser,
        operatingSystem: os,
        ipAddress,
        expires: new Date(Date.now() + this.SESSION_DURATION),
      },
    })

    return session
  }

  async getSessions(userId: string): Promise<Session[]> {
    return prisma.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expires: { gt: new Date() },
      },
      orderBy: { lastActive: 'desc' },
    })
  }

  async revokeSession(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    })
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { lastActive: new Date() },
    })
  }

  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date()
    await prisma.session.deleteMany({
      where: {
        OR: [
          { expires: { lt: now } },
          { isRevoked: true },
        ],
      },
    })
  }
}
