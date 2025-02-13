import {
  getFinancialMetrics,
  getMaintenanceMetrics,
  getPropertyMetrics,
  getTenantMetrics,
  getTimeSeries
} from '@/lib/services/analytics'
import { createClient } from '@/utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

declare const console: Console

const timeRangeSchema = z.object({
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  date_range: z.enum(['week', 'month', 'quarter', 'year', 'custom']).optional()
})

type MetricType = 'properties' | 'tenants' | 'finances' | 'maintenance' | 'trends'

export async function GET(
  req: NextRequest,
  { params }: { params: { metric: string } }
): Promise<NextResponse> {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to access analytics' },
        { status: 401 }
      )
    }

    const searchParams = req.nextUrl.searchParams
    const query = {
      start_date: searchParams.get('start_date'),
      end_date: searchParams.get('end_date'),
      date_range: searchParams.get('date_range')
    }

    const validatedQuery = timeRangeSchema.safeParse(query)
    if (!validatedQuery.success) {
      return NextResponse.json(
        { error: 'Invalid date range parameters', details: validatedQuery.error.errors },
        { status: 400 }
      )
    }

    const metric = params.metric as MetricType
    let data

    switch (metric) {
      case 'properties':
        data = await getPropertyMetrics(user.id)
        break
      case 'tenants':
        data = await getTenantMetrics(user.id)
        break
      case 'finances':
        data = await getFinancialMetrics(user.id)
        break
      case 'maintenance':
        data = await getMaintenanceMetrics(user.id)
        break
      case 'trends': {
        const trendMetric = searchParams.get('trend_metric')
        if (!trendMetric) {
          return NextResponse.json(
            { error: 'Trend metric parameter is required for trends analysis' },
            { status: 400 }
          )
        }

        const startDate = validatedQuery.data.start_date
          ? new Date(validatedQuery.data.start_date)
          : new Date()
        const endDate = validatedQuery.data.end_date
          ? new Date(validatedQuery.data.end_date)
          : new Date()

        data = await getTimeSeries(user.id, trendMetric, startDate, endDate)
        break
      }
      default:
        return NextResponse.json(
          {
            error: 'Invalid metric type',
            message: `Metric must be one of: properties, tenants, finances, maintenance, trends`
          },
          { status: 400 }
        )
    }

    if (!data) {
      return NextResponse.json(
        { error: `No data available for ${metric} analytics` },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error(`Error in analytics ${params.metric} GET route:`, error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      )
    }

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Too munknown requests. Please try again later.' },
          { status: 429 }
        )
      }
      if (error.message.includes('permission')) {
        return NextResponse.json(
          { error: 'You do not have permission to access this data' },
          { status: 403 }
        )
      }
    }

    return NextResponse.json(
      {
        error: `Failed to fetch ${params.metric} analytics`,
        message: 'An unexpected error occurred while processing your request'
      },
      { status: 500 }
    )
  }
}
