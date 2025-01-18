// app/api/auth/[auth0]/route.ts
import { handleAuth, Session } from '@auth0/nextjs-auth0'

export const runtime = 'nodejs' // Add this line

export const GET = handleAuth({
  callback: async (req: Request, session: Session) => {
    const res = await handleAuth({
      callback: async () => session
    })(req);
    return res;
  }
});
