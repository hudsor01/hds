import type {UserRole} from '@/types/auth';
import {clerkClient} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export async function withRoleAuth(handler: Function, requiredRole: UserRole) {
  return async (req: Request, ...args: any[]) => {
    try {
      const userId = req.headers.get('x-clerk-user-id');
      if (!userId) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
      }

      const user = await clerkClient.users.getUser(userId);
      const userRole = (user.privateMetadata?.role as UserRole) || 'USER';

      if (userRole !== requiredRole && userRole !== 'ADMIN') {
        return NextResponse.json({error: 'Insufficient permissions'}, {status: 403});
      }

      return handler(req, ...args);
    } catch (error) {
      console.error('Error in role auth middleware:', error);
      return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
  };
}

// Usage example:
// export const GET = withRoleAuth(async (req: Request) => {
//   // Handler implementation
// }, ['canViewAllProperties']);
