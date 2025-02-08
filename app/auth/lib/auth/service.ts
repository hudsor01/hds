import { prisma } from '@/prisma/seed';
import type { Session } from '@/types/database.types';
import { nanoid } from 'nanoid';

export type { Session };

export class AuthService {
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static async setupTwoFactor(
    userId: string,
  ): Promise<{ secret: string; qrCode: string }> {
    // Implementation will be added later
    throw new Error('Not implemented');
  }

  async createSession(
    userId: string,
    userAgent: string,
    ipAddress: string,
  ): Promise<Session> {
    const session = await prisma.session.create({
      data: {
        userId,
        sessionToken: nanoid(32),
        expires: new Date(Date.now() + this.SESSION_DURATION),
      },
    });

    return session;
  }

  async getSessions(userId: string): Promise<Session[]> {
    return prisma.session.findMany({
      where: {
        userId,
        expires: { gt: new Date() },
      },
      orderBy: { expires: 'desc' },
    });
  }

  async revokeSession(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { expires: new Date() },
    });
  }

  async updateSessionActivity(sessionId: string): Promise<void> {
    await prisma.session.update({
      where: { id: sessionId },
      data: { expires: new Date(Date.now() + this.SESSION_DURATION) },
    });
  }

  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date();
    await prisma.session.deleteMany({
      where: {
        expires: { lt: now },
      },
    });
  }
}
