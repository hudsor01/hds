import {prisma} from '@/lib/db';

export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  created_at: Date;
  status: string;
}

export const waitlistDB = {
  getAll: async () => {
    return await prisma.waitlist.findMany({
      orderBy: {created_at: 'desc'},
    });
  },
} as const;
