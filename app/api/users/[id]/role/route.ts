import {supabase} from '@/lib/supabase';
import type {UserRole} from '@/types/auth';
import {auth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    // Only allow users to fetch their own role or admins to fetch any role
    const {data: currentUser, error: currentUserError} = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (currentUserError) {
      return NextResponse.json({error: 'Failed to fetch user role'}, {status: 500});
    }

    if (currentUser.role !== 'ADMIN' && userId !== params.id) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 403});
    }

    const {data: user, error} = await supabase
      .from('users')
      .select('role')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({error: 'Failed to fetch user role'}, {status: 500});
    }

    return NextResponse.json({data: {role: user.role as UserRole}});
  } catch (error) {
    console.error('Error in user role GET route:', error);
    return NextResponse.json({error: 'Failed to fetch user role'}, {status: 500});
  }
}
