import { getAnalyticsDashboard } from '@/lib/services/analytics';
import { supabase } from '@/lib/supabase';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Cache analytics data for 5 minutes
const CACHE_TTL = 5 * 60 * 1000;
const analyticsCache = new Map<string, {data: any; timestamp: number; query: string}>();

const analyticsQuerySchema = z.object({
  date_range: z.enum(['week', 'month', 'quarter', 'year', 'custom']).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  property_id: z.string().uuid().optional(),
  group_by: z.string().optional(),
  metrics: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
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

    // Parse and validate query parameters
    const searchParams = req.nextUrl.searchParams;
    const query = {
      date_range: searchParams.get('date_range'),
      start_date: searchParams.get('start_date'),
      end_date: searchParams.get('end_date'),
      property_id: searchParams.get('property_id'),
      group_by: searchParams.get('group_by'),
      metrics: searchParams.getAll('metrics'),
    };

    const validatedQuery = analyticsQuerySchema.parse(query);

    // Generate cache key including role and user ID for proper isolation
    const cacheKey = `${userId}-${user.role}-${JSON.stringify(validatedQuery)}`;
    const now = Date.now();

    // Check cache
    const cached = analyticsCache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({data: cached.data, cached: true});
    }

    // Get fresh data with role context
    const analytics = await getAnalyticsDashboard(userId, {
      ...validatedQuery,
      role: user.role,
    });

    // Update cache
    analyticsCache.set(cacheKey, {
      data: analytics,
      timestamp: now,
      query: JSON.stringify(validatedQuery),
    });

    // Clean up old cache entries
    for (const [key, value] of analyticsCache.entries()) {
      if (now - value.timestamp > CACHE_TTL) {
        analyticsCache.delete(key);
      }
    }

    return NextResponse.json({data: analytics, cached: false});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in analytics GET route:', error);
    return NextResponse.json({error: 'Failed to fetch analytics'}, {status: 500});
  }
}

// Endpoint to refresh analytics data
export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const validatedQuery = analyticsQuerySchema.parse(body);

    // Force refresh data with role context
    const analytics = await getAnalyticsDashboard(userId, {
      ...validatedQuery,
      role: user.role,
    });

    // Update cache
    const cacheKey = `${userId}-${user.role}-${JSON.stringify(validatedQuery)}`;
    analyticsCache.set(cacheKey, {
      data: analytics,
      timestamp: Date.now(),
      query: JSON.stringify(validatedQuery),
    });

    return NextResponse.json({data: analytics, refreshed: true});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in analytics POST route:', error);
    return NextResponse.json({error: 'Failed to refresh analytics'}, {status: 500});
  }
}

// Endpoint to clear analytics cache
export async function DELETE(req: NextRequest) {
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

    // Only allow admins to clear all cache
    if (user.role === 'ADMIN') {
      analyticsCache.clear();
    } else {
      // Clear only user's cache entries
      for (const [key] of analyticsCache.entries()) {
        if (key.startsWith(`${userId}-${user.role}`)) {
          analyticsCache.delete(key);
        }
      }
    }

    return NextResponse.json({message: 'Analytics cache cleared'});
  } catch (error) {
    console.error('Error in analytics DELETE route:', error);
    return NextResponse.json({error: 'Failed to clear analytics cache'}, {status: 500});
  }
}
