// Base types
export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ActivityType = 'MAINTENANCE' | 'PAYMENT' | 'LEASE' | 'INSPECTION';

// Financial metrics type
export interface FinancialMetrics {
  amount: number;
  currency: string;
  period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  previousAmount?: number;
  percentageChange?: number;
  breakdown?: Record<string, number>;
}

export interface RecentActivity {
  activity: any;
  [x: string]: any;
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  status: Status;
  priority?: Priority;
  amount?: number;
  propertyId?: string;
  unitId?: string;
}

export interface PropertyStats {
  overview: {
    totalProperties: number;
    occupiedUnits: number;
    vacantUnits: number;
    totalUnits: number;
    underMaintenance: number;
  };
  occupancy: {
    rate: number;
    trend: number;
    historicalRates: Array<{
      period: string;
      rate: number;
    }>;
    byPropertyType: Record<string, number>;
  };
  financial: {
    revenue: FinancialMetrics;
    expenses: FinancialMetrics;
    netIncome: FinancialMetrics;
    outstanding: FinancialMetrics;
    projections: {
      nextMonth: FinancialMetrics;
      nextQuarter: FinancialMetrics;
    };
  };
  tenants: {
    total: number;
    active: number;
    pending: number;
    moveIns: number;
    moveOuts: number;
    satisfactionRate: number;
  };
  maintenance: {
    openTickets: number;
    resolvedTickets: number;
    averageResolutionTime: number;
    byPriority: Record<Priority, number>;
    byStatus: Record<Status, number>;
  };
  leases: {
    active: number;
    expiringSoon: number;
    renewed: number;
    newLeases: number;
    averageTerm: number;
  };
  trends: {
    occupancy: number[];
    revenue: number[];
    expenses: number[];
    satisfaction: number[];
  };
  alerts: Array<{
    type: ActivityType;
    message: string;
    priority: Priority;
    timestamp: string;
  }>;
}
