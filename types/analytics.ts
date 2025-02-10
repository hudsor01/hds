import type { UserRole } from '@/utils/roles';

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

export interface Trend {
  value: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface PropertyMetrics {
  total: number;
  active: number;
  vacant: number;
  trend?: Trend;
}

export interface TenantMetrics {
  total: number;
  active: number;
  pending: number;
  trend?: Trend;
}

export interface FinancialMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  trend?: Trend;
}

export interface MaintenanceMetrics {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
  trend?: Trend;
}

export interface TimeSeriesData {
  date: string;
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
  role?: UserRole;
}
