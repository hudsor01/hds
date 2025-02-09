import { prisma } from '@/lib/db'

export interface WaitlistEntry {
  id: string
  email: string
  name?: string
  created_at: Date
  status: string
}

export const getWaitlistEntries = async () => {
  return await prisma.waitlist.findMany({
    orderBy: { created_at: 'desc' },
  })
}
