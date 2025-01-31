import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import type { PrismaLogEvent, PrismaLogLevel } from '@/types/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [
            { level: 'query', emit: 'event' },
            { level: 'error', emit: 'event' },
            { level: 'warn', emit: 'event' },
            { level: 'info', emit: 'event' },
          ]
        : ['error'],
    errorFormat: 'pretty',
  }).$extends(withAccelerate());

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;

  const logger = {
    query: (e: PrismaLogEvent) => {
      if (e.duration && e.duration > 100) {
        console.log('Slow Query:', {
          query: e.query,
          params: e.params,
          duration: `${e.duration}ms`,
          timestamp: new Date().toISOString(),
        });
      }
    },
    error: (e: PrismaLogEvent) => {
      console.error('Prisma Error:', {
        ...e,
        timestamp: new Date().toISOString(),
      });
    },
    warn: (e: PrismaLogEvent) => {
      console.warn('Prisma Warning:', {
        ...e,
        timestamp: new Date().toISOString(),
      });
    },
    info: (e: PrismaLogEvent) => {
      console.info('Prisma Info:', {
        ...e,
        timestamp: new Date().toISOString(),
      });
    },
  };

  // Attach event listeners with proper cleanup
  const listeners = new Map();

  Object.entries(logger).forEach(([level, handler]) => {
    if (Object.prototype.hasOwnProperty.call(logger, level)) {
      const unsubscribe = prisma.$on(level as PrismaLogLevel, handler);
      listeners.set(level, unsubscribe);
    }
  });

  // Cleanup listeners when the process exits
  process.on('beforeExit', () => {
    listeners.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        console.error('Failed to cleanup Prisma listener:', error);
      }
    });
  });
}
