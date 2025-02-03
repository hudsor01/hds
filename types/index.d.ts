import {users} from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user?: users | null;
    }
  }
}

export {};
