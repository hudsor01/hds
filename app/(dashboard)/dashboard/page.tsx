'use client';

import { useAuth } from '@/hooks/auth/use-auth';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { apiClient } from '@/lib/api';
import type {
  FinancialMetrics,
  MaintenanceMetrics,
  PropertyMetrics,
  TenantMetrics,
  TimeSeriesData,
} from '@/types/analytics';
import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DollarSign, Home, Tool, Users } from 'react-feather';
import { checkRole } from '@/utils/roles';
import MetricCard from '@/components/analytics/metric-card';
import AnalyticsChart from '@/components/analytics/analytics-chart';

const REFETCH_INTERVAL = 30000; // 30 seconds

interface ApiResponse<T> {
  data: T;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { permissions } = usePermissions();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user]);

  const { data: propertyMetrics, isLoading: loadingProperties } = useQuery<
    ApiResponse<PropertyMetrics>,
    Error,
    ApiResponse<PropertyMetrics>
  >({
    queryKey: ['analytics', 'properties', role],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/analytics/properties');
      return data;
    },
    enabled: Boolean(
      role && (checkRole(role, 'admin') || permissions.includes('view_properties')),
    ),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: tenantMetrics, isLoading: loadingTenants } = useQuery<
    ApiResponse<TenantMetrics>,
    Error,
    ApiResponse<TenantMetrics>
  >({
    queryKey: ['analytics', 'tenants', role],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/analytics/tenants');
      return data;
    },
    enabled: Boolean(
      role && (permissions.includes('view_tenants') || role === 'TENANT'),
    ),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: financialMetrics, isLoading: loadingFinances } = useQuery<
    ApiResponse<FinancialMetrics>,
    Error,
    ApiResponse<FinancialMetrics>
  >({
    queryKey: ['analytics', 'finances', role],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/analytics/finances');
      return data;
    },
    enabled: Boolean(
      role && (permissions.includes('view_finances') || role === 'TENANT'),
    ),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: maintenanceMetrics, isLoading: loadingMaintenance } = useQuery<
    ApiResponse<MaintenanceMetrics>,
    Error,
    ApiResponse<MaintenanceMetrics>
  >({
    queryKey: ['analytics', 'maintenance', role],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/analytics/maintenance');
      return data;
    },
    enabled: Boolean(
      role && (permissions.includes('view_maintenance') || role === 'TENANT'),
    ),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: trends } = useQuery<
    ApiResponse<TimeSeriesData[]>,
    Error,
    ApiResponse<TimeSeriesData[]>
  >({
    queryKey: ['analytics', 'trends', role],
    queryFn: async () => {
      const { data } = await apiClient.get(
        '/api/analytics/trends?trend_metric=revenue',
      );
      return data;
    },
    enabled: Boolean(
      role && (permissions.includes('view_reports') || role === 'TENANT'),
    ),
    refetchInterval: REFETCH_INTERVAL,
  });

  const getMetricTitle = () => {
    if (!role) return 'Properties';
    switch (role) {
      case 'TENANT':
        return 'My Properties';
      case 'PROPERTY_MANAGER':
        return 'Managed Properties';
      default:
        return 'Total Properties';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Grid>

      {/* Property Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title={getMetricTitle()}
          value={propertyMetrics?.data.total || 0}
          isLoading={loadingProperties}
          icon={<Home />}
          trend={propertyMetrics?.data.trend}
        />
      </Grid>

      {/* Tenant Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Active Tenants"
          value={tenantMetrics?.data.active || 0}
          isLoading={loadingTenants}
          icon={<Users />}
          trend={tenantMetrics?.data.trend}
        />
      </Grid>

      {/* Financial Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Monthly Revenue"
          value={financialMetrics?.data.revenue || 0}
          isLoading={loadingFinances}
          icon={<DollarSign />}
          trend={financialMetrics?.data.trend}
          format="currency"
        />
      </Grid>

      {/* Maintenance Metrics */}
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Open Requests"
          value={maintenanceMetrics?.data.open || 0}
          isLoading={loadingMaintenance}
          icon={<Tool />}
          trend={maintenanceMetrics?.data.trend}
        />
      </Grid>

      {/* Charts */}
      <Grid item xs={12} md={8}>
        <AnalyticsChart
          title="Revenue Trend"
          data={trends?.data || []}
          valuePrefix="$"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        {/* Activity Feed will be added here */}
      </Grid>
    </Grid>
  );
}
