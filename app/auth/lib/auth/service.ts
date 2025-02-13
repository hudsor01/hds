import { prisma } from '@/prisma/seed'
import { nanoid } from 'nanoid'
import { TRPCError } from '@trpc/server'

export interface Session {
  id: string
  user_id: string
  session_token: string
  expires: Date
  user_agent?: string
  ip_address?: string
  last_active: Date
}

export class AuthService {
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static async setupTwoFactor(userId: string): Promise<{ secret: string; qrCode: string }> {
    try {
      const user = await prisma.users.findUnique({ where: { id: userId } })
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }
      // Implementation placeholder
      return { secret: '', qrCode: '' }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to setup 2FA',
        cause: error
      })
    }
  }

  async createSession(userId: string, userAgent: string, ipAddress: string): Promise<Session> {
    try {
      const session = await prisma.session.create({
        data: {
          user_id: userId,
          session_token: nanoid(32),
          expires: new Date(Date.now() + this.SESSION_DURATION),
          user_agent: userAgent,
          ip_address: ipAddress,
          last_active: new Date()
        }
      })
      return session
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create session',
        cause: error
      })
    }
  }

  async getSessions(userId: string): Promise<Session[]> {
    try {
      return await prisma.session.findMunknown({
        where: {
          user_id: userId,
          expires: { gt: new Date() }
        },
        orderBy: { expires: 'desc' }
      })
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch sessions',
        cause: error
      })
    }
  }

  async revokeSession(sessionId: string): Promise<void> {
    try {
      await prisma.session.update({
        where: { id: sessionId },
        data: { expires: new Date() }
      })
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to revoke session',
        cause: error
      })
    }
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    try {
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          expires: new Date(Date.now() + this.SESSION_DURATION),
          last_active: new Date()
        }
      })
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update session activity',
        cause: error
      })
    }
  }

  async cleanupExpiredSessions(): Promise<void> {
    try {
      await prisma.session.deleteMunknown({
        where: {
          expires: { lt: new Date() }
        }
      })
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to cleanup expired sessions',
        cause: error
      })
    }
  }
}
