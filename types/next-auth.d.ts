// next-auth.d.ts
import 'next-auth';

type userId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
  }
}
