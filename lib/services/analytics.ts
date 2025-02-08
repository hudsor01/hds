import { supabase } from '@/lib/supabase';
import type {
  AnalyticsDashboard,
  AnalyticsQuery,
  FinancialMetrics,
  MaintenanceMetrics,
  PropertyMetrics,
  TenantMetrics,
  TimeSeriesData,
} from '@/types/analytics';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

export async function getPropertyMetrics(
  userId: string,
): Promise<PropertyMetrics> {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const total = properties.length;
  const occupied = properties.filter(
    (p) => p.property_status === 'OCCUPIED',
  ).length;
  const totalRent = properties.reduce(
    (sum, p) => sum + Number(p.rent_amount),
    0,
  );

  const byType = properties.reduce(
    (acc, p) => {
      acc[p.property_type] = (acc[p.property_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const byStatus = properties.reduce(
    (acc, p) => {
      acc[p.property_status] = (acc[p.property_status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total_properties: total,
    occupancy_rate: total ? (occupied / total) * 100 : 0,
    avg_rent: total ? totalRent / total : 0,
    total_revenue: totalRent,
    properties_by_type: byType,
    properties_by_status: byStatus,
  };
}

export async function getTenantMetrics(userId: string): Promise<TenantMetrics> {
  const now = new Date();
  const startOfThisMonth = startOfMonth(now);
  const endOfThisMonth = endOfMonth(now);

  const { data: tenants, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const total = tenants.length;
  const active = tenants.filter((t) => t.tenant_status === 'ACTIVE').length;
  const moveIns = tenants.filter(
    (t) =>
      t.move_in_date &&
      new Date(t.move_in_date) >= startOfThisMonth &&
      new Date(t.move_in_date) <= endOfThisMonth,
  ).length;
  const moveOuts = tenants.filter(
    (t) =>
      t.move_out_date &&
      new Date(t.move_out_date) >= startOfThisMonth &&
      new Date(t.move_out_date) <= endOfThisMonth,
  ).length;

  const byStatus = tenants.reduce(
    (acc, t) => {
      acc[t.tenant_status] = (acc[t.tenant_status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total_tenants: total,
    active_tenants: active,
    move_ins_this_month: moveIns,
    move_outs_this_month: moveOuts,
    tenants_by_status: byStatus,
    lease_renewals_due: 0, // TODO: Implement lease renewal calculation
  };
}

export async function getFinancialMetrics(
  userId: string,
): Promise<FinancialMetrics> {
  const startDate = startOfMonth(subMonths(new Date(), 1));
  const endDate = endOfMonth(new Date());

  const { data: payments, error: paymentsError } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .gte('payment_date', startDate.toISOString())
    .lte('payment_date', endDate.toISOString());

  if (paymentsError) throw paymentsError;

  const { data: expenses, error: expensesError } = await supabase
    .from('expenses')
    .select('*')
    .eq('created_by', userId)
    .gte('date', startDate.toISOString())
    .lte('date', endDate.toISOString());

  if (expensesError) throw expensesError;

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.payment_amount),
    0,
  );
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const revenueByType = payments.reduce(
    (acc, p) => {
      acc[p.payment_type] =
        (acc[p.payment_type] || 0) + Number(p.payment_amount);
      return acc;
    },
    {} as Record<string, number>,
  );

  const expensesByCategory = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    },
    {} as Record<string, number>,
  );

  const expectedPayments = payments.length;
  const receivedPayments = payments.filter(
    (p) => p.payment_status === 'COMPLETED',
  ).length;

  return {
    total_revenue: totalRevenue,
    total_expenses: totalExpenses,
    net_income: totalRevenue - totalExpenses,
    revenue_by_type: revenueByType,
    expenses_by_category: expensesByCategory,
    payment_collection_rate: expectedPayments
      ? (receivedPayments / expectedPayments) * 100
      : 0,
    outstanding_balance: 0, // TODO: Implement outstanding balance calculation
  };
}

export async function getMaintenanceMetrics(
  userId: string,
): Promise<MaintenanceMetrics> {
  const { data: workOrders, error } = await supabase
    .from('work_orders')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const total = workOrders.length;
  const open = workOrders.filter(
    (wo) => wo.status !== 'COMPLETED' && wo.status !== 'CANCELLED',
  ).length;

  const completedOrders = workOrders.filter((wo) => wo.status === 'COMPLETED');
  const avgCompletionTime =
    completedOrders.length > 0
      ? completedOrders.reduce((sum, wo) => {
          const start = new Date(wo.created_at);
          const end = new Date(wo.completed_date!);
          return sum + (end.getTime() - start.getTime());
        }, 0) /
        completedOrders.length /
        (1000 * 60 * 60 * 24) // Convert to days
      : 0;

  const byPriority = workOrders.reduce(
    (acc, wo) => {
      acc[wo.priority] = (acc[wo.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const byStatus = workOrders.reduce(
    (acc, wo) => {
      acc[wo.status] = (acc[wo.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const costByProperty = workOrders.reduce(
    (acc, wo) => {
      acc[wo.property_id] =
        (acc[wo.property_id] || 0) + Number(wo.actual_cost || 0);
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total_work_orders: total,
    open_work_orders: open,
    avg_completion_time: avgCompletionTime,
    work_orders_by_priority: byPriority,
    work_orders_by_status: byStatus,
    maintenance_cost_by_property: costByProperty,
  };
}

export async function getTimeSeries(
  userId: string,
  metric: string,
  startDate: Date,
  endDate: Date,
): Promise<TimeSeriesData[]> {
  // Implementation will depend on the specific metric
  // This is a placeholder that should be implemented based on requirements
  return [];
}

export async function getAnalyticsDashboard(
  userId: string,
  query?: AnalyticsQuery,
): Promise<AnalyticsDashboard> {
  const [propertyMetrics, tenantMetrics, financialMetrics, maintenanceMetrics] =
    await Promise.all([
      getPropertyMetrics(userId),
      getTenantMetrics(userId),
      getFinancialMetrics(userId),
      getMaintenanceMetrics(userId),
    ]);

  const startDate = query?.start_date
    ? new Date(query.start_date)
    : subMonths(new Date(), 12);
  const endDate = query?.end_date ? new Date(query.end_date) : new Date();

  const [revenueTrend, occupancyTrend, expensesTrend] = await Promise.all([
    getTimeSeries(userId, 'revenue', startDate, endDate),
    getTimeSeries(userId, 'occupancy', startDate, endDate),
    getTimeSeries(userId, 'expenses', startDate, endDate),
  ]);

  return {
    property_metrics: propertyMetrics,
    tenant_metrics: tenantMetrics,
    financial_metrics: financialMetrics,
    maintenance_metrics: maintenanceMetrics,
    revenue_trend: revenueTrend,
    occupancy_trend: occupancyTrend,
    expenses_trend: expensesTrend,
  };
}
