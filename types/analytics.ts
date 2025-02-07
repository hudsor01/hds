export interface EmailMetric {
  template: string;
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
}

export type EmailMetricsProps = {
  data: EmailMetric[];
};

export interface PropertyMetrics {
  total_properties: number;
  occupancy_rate: number;
  avg_rent: number;
  total_revenue: number;
  properties_by_type: Record<string, number>;
  properties_by_status: Record<string, number>;
}

export interface TenantMetrics {
  total_tenants: number;
  active_tenants: number;
  move_ins_this_month: number;
  move_outs_this_month: number;
  tenants_by_status: Record<string, number>;
  lease_renewals_due: number;
}

export interface FinancialMetrics {
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  revenue_by_type: Record<string, number>;
  expenses_by_category: Record<string, number>;
  payment_collection_rate: number;
  outstanding_balance: number;
}

export interface MaintenanceMetrics {
  total_work_orders: number;
  open_work_orders: number;
  avg_completion_time: number;
  work_orders_by_priority: Record<string, number>;
  work_orders_by_status: Record<string, number>;
  maintenance_cost_by_property: Record<string, number>;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface AnalyticsDashboard {
  property_metrics: PropertyMetrics;
  tenant_metrics: TenantMetrics;
  financial_metrics: FinancialMetrics;
  maintenance_metrics: MaintenanceMetrics;
  revenue_trend: TimeSeriesData[];
  occupancy_trend: TimeSeriesData[];
  expenses_trend: TimeSeriesData[];
}

export type DateRange = 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface AnalyticsQuery {
  date_range?: DateRange;
  start_date?: string;
  end_date?: string;
  property_id?: string;
  group_by?: string;
  metrics?: string[];
}
