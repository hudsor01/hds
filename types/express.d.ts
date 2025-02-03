import {Users} from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string | null;
        sessionId: string | null;
        session?: {
          id: string;
          userId: string;
          status: string;
        };
        claims?: Record<string, unknown>;
      };
      user?: Users | null;
    }
  }
}

export {};
