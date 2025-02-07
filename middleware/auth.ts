import {supabase} from '@/lib/supabase';
import {DEFAULT_ROLE_PERMISSIONS, type UserRole} from '@/types/auth';
import {auth} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export async function withRoleAuth(handler: Function, requiredPermissions: string[]) {
  return async (req: Request, ...args: any[]) => {
    try {
      const {userId} = await auth();
      if (!userId) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
      }

      // Get user role
      const {data: user, error: userError} = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (userError) {
        return NextResponse.json({error: 'Failed to fetch user role'}, {status: 500});
      }

      const role = user.role as UserRole;
      const permissions = DEFAULT_ROLE_PERMISSIONS[role];

      // Check if user has all required permissions
      const hasPermissions = requiredPermissions.every(
        permission => permissions[permission as keyof typeof permissions],
      );

      if (!hasPermissions) {
        return NextResponse.json({error: 'Insufficient permissions'}, {status: 403});
      }

      // Add role to request for use in handler
      const enhancedReq = new Request(req, {
        headers: new Headers({
          ...Object.fromEntries(req.headers.entries()),
          'x-user-role': role,
        }),
      });

      return handler(enhancedReq, ...args);
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
