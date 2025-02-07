import {prisma} from './db';

export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  created_at: Date;
  status: string;
}

export class WaitlistDB {
  async getAll(): Promise<WaitlistEntry[]> {
    return prisma.waitlist.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}

export const waitlistDB = new WaitlistDB();
