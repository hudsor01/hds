import db from "@/lib/db"
import { PrismaClient } from "@prisma/client"
import type { Session } from '@supabase/supabase-js'
import { nanoid } from "nanoid"
import UAParser from 'ua-parser-js'


const prisma = new PrismaClient()

export class AuthService {
  [x: string]: any
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  async createSession(
    userId: string,
    userAgent: string,
    ipAddress: string
  ): Promise<Session> {
    // Parse user agent for device info
    const parser = UAParser(userAgent)
    const browser = `${parser.getBrowser().name || 'unknown'} ${parser.getBrowser().version || ''}`
    const os = parser.getOS().name || 'unknown'
    const device = parser.getDevice().type || 'desktop'

    // Create session in database
    const session = await db.session.create({
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
    return db.session.findMany({
      where: {
        userId,
        isRevoked: false,
        expires: { gt: new Date() },
      },
      orderBy: { lastActive: 'desc' },
    })
  }

  async revokeSession(sessionId: string): Promise<void> {
    await db.session.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    })
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    await db.session.update({
      where: { id: sessionId },
      data: { lastActive: new Date() },
    })
  }

  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date()
    await db.session.deleteMany({
      where: {
        OR: [
          { expires: { lt: now } },
          { isRevoked: true },
        ],
      },
    })
  }
}

export const authService = new AuthService()
