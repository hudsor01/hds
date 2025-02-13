import { safeQuery, DatabaseError } from '@/lib/supabase'
import supabase from '@/lib/supabase'
import type {
  AnalyticsDashboard,
  AnalyticsQuery,
  FinancialMetrics,
  MaintenanceMetrics,
  PropertyMetrics,
  TenantMetrics,
  TimeSeriesData
} from '@/types/analytics'
import { AnalyticsQuerySchemaType } from '@/types/db.types'
import { endOfMonth, startOfMonth, subMonths } from 'date-fns'
import { AnalyticsEvent, AnalyticsConfig, EmailStats, WaitlistStats } from '@/types'
import { startOfDay, endOfDay, sub } from 'date-fns'
import { z } from 'zod'

export const analyticsQuerySchema = z.lazy(() =>
  z.object({
    startDate: z.date(),
    endDate: z.date(),
    interval: z.enum(['day', 'week', 'month']),
    metrics: z.array(z.string()).min(1, 'At least one metric must be selected')
  })
) satisfies z.ZodType<AnalyticsQuerySchemaType>

export async function getPropertyMetrics(userId: string): Promise<PropertyMetrics> {
  return await safeQuery(async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('property_status,property_type,rent_amount')
      .eq('user_id', userId)

    if (error) throw error

    const total = data.length
    const active = data.filter(p => p.property_status === 'ACTIVE').length
    const vacant = data.filter(p => p.property_status === 'VACANT').length

    return {
      data: {
        total,
        active,
        vacant,
        properties: data
      },
      error
    }
  })
}

export async function getTenantMetrics(userId: string): Promise<TenantMetrics> {
  const now = new Date()
  const startOfThisMonth = startOfMonth(now)
  const endOfThisMonth = endOfMonth(now)

  const { data: tenants, error } = await supabase.from('tenants').select('*').eq('user_id', userId)

  if (error) throw new Error(`Failed to fetch tenants: ${error.message}`)

  const total = tenants.length
  const active = tenants.filter(t => t.tenant_status === 'ACTIVE').length
  const moveIns = tenants.filter(
    t =>
      t.move_in_date &&
      new Date(t.move_in_date) >= startOfThisMonth &&
      new Date(t.move_in_date) <= endOfThisMonth
  ).length
  const moveOuts = tenants.filter(
    t =>
      t.move_out_date &&
      new Date(t.move_out_date) >= startOfThisMonth &&
      new Date(t.move_out_date) <= endOfThisMonth
  ).length

  const byStatus = tenants.reduce(
    (acc, t) => {
      acc[t.tenant_status] = (acc[t.tenant_status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return {
    totalTenants: total,
    activeTenants: active,
    moveInsThisMonth: moveIns,
    moveOutsThisMonth: moveOuts,
    tenantsByStatus: byStatus,
    leaseRenewalsDue: 0 // TODO: Implement lease renewal calculation
  }
}

export async function getFinancialMetrics(userId: string): Promise<FinancialMetrics> {
  const startDate = startOfMonth(subMonths(new Date(), 1))
  const endDate = endOfMonth(new Date())

  const [paymentsResponse, expensesResponse] = await Promise.all([
    supabase
      .from('payments')
      .select('payment_amount,payment_type,payment_status')
      .eq('user_id', userId)
      .gte('payment_date', startDate.toISOString())
      .lte('payment_date', endDate.toISOString()),
    supabase
      .from('expenses')
      .select('amount,category')
      .eq('created_by', userId)
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString())
  ])

  if (paymentsResponse.error)
    throw new Error(`Failed to fetch payments: ${paymentsResponse.error.message}`)
  if (expensesResponse.error)
    throw new Error(`Failed to fetch expenses: ${expensesResponse.error.message}`)

  const payments = paymentsResponse.data
  const expenses = expensesResponse.data

  const metrics = payments.reduce(
    (acc, p) => {
      const amount = Number(p.payment_amount || 0)
      acc.totalRevenue += amount
      acc.revenueByType[p.payment_type] = (acc.revenueByType[p.payment_type] || 0) + amount
      if (p.payment_status === 'COMPLETED') acc.receivedPayments++
      acc.expectedPayments++
      return acc
    },
    {
      totalRevenue: 0,
      revenueByType: {} as Record<string, number>,
      receivedPayments: 0,
      expectedPayments: 0
    }
  )

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  const expensesByCategory = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0)
      return acc
    },
    {} as Record<string, number>
  )

  return {
    total_revenue: metrics.totalRevenue,
    total_expenses: totalExpenses,
    net_income: metrics.totalRevenue - totalExpenses,
    revenue_by_type: metrics.revenueByType,
    expenses_by_category: expensesByCategory,
    payment_collection_rate: metrics.expectedPayments
      ? (metrics.receivedPayments / metrics.expectedPayments) * 100
      : 0,
    outstanding_balance: await calculateOutstandingBalance(userId)
  }
}

async function calculateOutstandingBalance(userId: string): Promise<number> {
  const { data: payments, error } = await supabase
    .from('payments')
    .select('payment_amount,payment_status')
    .eq('user_id', userId)
    .eq('payment_status', 'PENDING')

  if (error) throw new Error(`Failed to calculate outstanding balance: ${error.message}`)

  return payments.reduce((sum, p) => sum + Number(p.payment_amount || 0), 0)
}

export async function getMaintenanceMetrics(userId: string): Promise<MaintenanceMetrics> {
  const { data: workOrders, error } = await supabase
    .from('work_orders')
    .select('*')
    .eq('user_id', userId)

  if (error) throw new Error(`Failed to fetch work orders: ${error.message}`)

  const total = workOrders.length
  const open = workOrders.filter(
    wo => wo.status !== 'COMPLETED' && wo.status !== 'CANCELLED'
  ).length

  const completedOrders = workOrders.filter(wo => wo.status === 'COMPLETED')
  const avgCompletionTime =
    completedOrders.length > 0
      ? completedOrders.reduce((sum, wo) => {
          const completionTime =
            new Date(wo.completed_at).getTime() - new Date(wo.created_at).getTime()
          return sum + completionTime
        }, 0) /
        completedOrders.length /
        (1000 * 60 * 60 * 24)
      : 0

  const byPriority = workOrders.reduce(
    (acc, wo) => {
      acc[wo.priority] = (acc[wo.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const byStatus = workOrders.reduce(
    (acc, wo) => {
      acc[wo.status] = (acc[wo.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const costByProperty = workOrders.reduce(
    (acc, wo) => {
      acc[wo.property_id] = (acc[wo.property_id] || 0) + Number(wo.cost || 0)
      return acc
    },
    {} as Record<string, number>
  )

  return {
    total_work_orders: total,
    open_work_orders: open,
    avg_completion_time: avgCompletionTime,
    work_orders_by_priority: byPriority,
    work_orders_by_status: byStatus,
    maintenance_cost_by_property: costByProperty
  }
}

export async function getTimeSeries(
  userId: string,
  metric: string,
  startDate: Date,
  endDate: Date
): Promise<TimeSeriesData[]> {
  // Implementation will depend on the specific metric
  // This is a placeholder that should be implemented based on requirements
  return []
}

export async function getAnalyticsDashboard(
  userId: string,
  query: AnalyticsQuery
): Promise<AnalyticsDashboard> {
  try {
    // Validate query parameters
    const validatedQuery = analyticsQuerySchema.parse(query)

    const [propertyMetrics, tenantMetrics, financialMetrics, maintenanceMetrics] =
      await Promise.all([
        getPropertyMetrics(userId),
        getTenantMetrics(userId),
        getFinancialMetrics(userId),
        getMaintenanceMetrics(userId)
      ])

    const timeseriesData = await getTimeSeriesData(userId, validatedQuery)

    return {
      property_metrics: propertyMetrics,
      tenant_metrics: tenantMetrics,
      financial_metrics: financialMetrics,
      maintenance_metrics: maintenanceMetrics,
      timeseriesData: timeseriesData
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DatabaseError(
        'Invalid analytics query parameters',
        'VALIDATION_ERROR',
        error.errors.map(e => e.message).join(', ')
      )
    }
    throw error
  }
}

async function getTimeSeriesData(
  userId: string,
  query: z.infer<typeof analyticsQuerySchema>
): Promise<TimeSeriesData[]> {
  const { startDate, endDate, interval } = query

  return await safeQuery(
    async () => {
      const { data, error } = await supabase.rpc('get_timeseries_metrics', {
        p_user_id: userId,
        p_start_date: startDate.toISOString(),
        p_end_date: endDate.toISOString(),
        p_interval: interval
      })

      return { data, error }
    },
    {
      timeout: 60000, // Longer timeout for analytics queries
      retries: 2
    }
  )
}

export async function getEmailMetrics(userId: string, days = 30) {
  const startDate = startOfDay(sub(new Date(), { days }))
  const endDate = endOfDay(new Date())

  return await safeQuery(
    async () => {
      const { data, error } = await supabase
        .from('email_events')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())

      if (error) throw error

      const metrics = data.reduce(
        (acc, event) => {
          acc[event.type] = (acc[event.type] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )

      return {
        data: {
          sent: metrics.sent || 0,
          delivered: metrics.delivered || 0,
          opened: metrics.opened || 0,
          clicked: metrics.clicked || 0,
          bounced: metrics.bounced || 0,
          total: data.length
        },
        error: null
      }
    },
    {
      timeout: 30000,
      retries: 2
    }
  )
}
