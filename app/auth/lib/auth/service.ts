import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import { type Session, type User } from '@supabase/supabase-js'
import { TRPCError } from '@trpc/server'

export interface AuthSession {
  id: string
  userId: string
  sessionToken: string
  expires: Date
  userAgent?: string
  ipAddress?: string
  lastActive: Date
}

export class AuthService {
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static async setupTwoFactor(userId: string): Promise<{ secret: string; qrCode: string }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }

      // Implementation placeholder - integrate with your 2FA provider
      return {
        secret: nanoid(),
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${userId}`
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to setup 2FA',
        cause: error
      })
    }
  }

  async createSession(userId: string, userAgent: string, ipAddress: string): Promise<AuthSession> {
    try {
      const session = await prisma.session.create({
        data: {
          userId,
          sessionToken: nanoid(32),
          expires: new Date(Date.now() + this.SESSION_DURATION),
          userAgent,
          ipAddress,
          lastActive: new Date()
        }
      })

      return {
        id: session.id,
        userId: session.userId,
        sessionToken: session.sessionToken,
        expires: session.expires,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        lastActive: session.lastActive
      }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create session',
        cause: error
      })
    }
  }

  async getSessions(userId: string): Promise<AuthSession[]> {
    try {
      const sessions = await prisma.session.findMany({
        where: {
          userId,
          expires: { gt: new Date() }
        },
        orderBy: { expires: 'desc' }
      })

      return sessions.map(session => ({
        id: session.id,
        userId: session.userId,
        sessionToken: session.sessionToken,
        expires: session.expires,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        lastActive: session.lastActive
      }))
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
          lastActive: new Date()
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
      await prisma.session.deleteMany({
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
