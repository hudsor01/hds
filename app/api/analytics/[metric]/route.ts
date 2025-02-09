import {
  getFinancialMetrics,
  getMaintenanceMetrics,
  getPropertyMetrics,
  getTenantMetrics,
  getTimeSeries,
} from '@/lib/services/analytics'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const timeRangeSchema = z.object({
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  date_range: z.enum(['week', 'month', 'quarter', 'year', 'custom']).optional(),
})

export async function GET(req: NextRequest, { params }: { params: { metric: string } }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const query = {
      start_date: searchParams.get('start_date'),
      end_date: searchParams.get('end_date'),
      date_range: searchParams.get('date_range'),
    }

    const validatedQuery = timeRangeSchema.parse(query)

    let data
    switch (params.metric) {
      case 'properties':
        data = await getPropertyMetrics(userId)
        break
      case 'tenants':
        data = await getTenantMetrics(userId)
        break
      case 'finances':
        data = await getFinancialMetrics(userId)
        break
      case 'maintenance':
        data = await getMaintenanceMetrics(userId)
        break
      case 'trends':
        const metric = searchParams.get('trend_metric')
        if (!metric) {
          return NextResponse.json({ error: 'Trend metric is required' }, { status: 400 })
        }
        const startDate = validatedQuery.start_date
          ? new Date(validatedQuery.start_date)
          : new Date()
        const endDate = validatedQuery.end_date ? new Date(validatedQuery.end_date) : new Date()
        data = await getTimeSeries(userId, metric, startDate, endDate)
        break
      default:
        return NextResponse.json({ error: 'Invalid metric' }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error(`Error in analytics ${params.metric} GET route:`, error)
    return NextResponse.json(
      { error: `Failed to fetch ${params.metric} analytics` },
      { status: 500 }
    )
  }
}
