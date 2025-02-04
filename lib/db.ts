import {sql} from '@vercel/postgres';

interface WaitlistEntry {
  position: number;
  id: string;
  email: string;
  createdAt: Date;
  status: 'active' | 'invited' | 'joined';
}

// Initialize table
export async function initWaitlistTable() {
  await sql`
   CREATE TABLE IF NOT EXISTS waitlist (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     status TEXT DEFAULT 'active'
   );
 `;
}

// Core database operations
export const waitlistDB = {
  async add(email: string): Promise<WaitlistEntry> {
    const {rows} = await sql`
     INSERT INTO waitlist (email)
     VALUES (${email})
     RETURNING *
   `;
    return rows[0] as WaitlistEntry;
  },

  async getAll(): Promise<WaitlistEntry[]> {
    const {rows} = await sql`
     SELECT * FROM waitlist
     ORDER BY created_at DESC
   `;
    return rows as WaitlistEntry[];
  },

  async exists(email: string): Promise<boolean> {
    const {rows} = await sql`
     SELECT 1 FROM waitlist
     WHERE email = ${email}
   `;
    return rows.length > 0;
  },
};

export const analyticsDB = {
  getStats: async ({
    startDate,
    endDate,
    template,
  }: {
    startDate?: Date;
    endDate?: Date;
    template?: string;
  }) => {
    // Implement your analytics logic here.
    return []; // Replace with actual stats data.
  },
};

// Update API route
export async function POST(req: Request) {
  try {
    const {email} = await req.json();

    if (await waitlistDB.exists(email)) {
      return Response.json({error: 'Already registered'}, {status: 400});
    }

    const entry = await waitlistDB.add(email);
    return Response.json(entry);
  } catch (error) {
    return Response.json({error: 'Failed to join waitlist'}, {status: 500});
  }
}
