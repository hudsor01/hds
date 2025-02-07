'use client';

import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import MetricCard from '@/components/analytics/MetricCard';
import {api} from '@/lib/api';
import type {
  FinancialMetrics,
  MaintenanceMetrics,
  PropertyMetrics,
  TenantMetrics,
  TimeSeriesData,
} from '@/types/analytics';
import {Grid, Typography} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {DollarSign, Home, Tool, Users} from 'react-feather';

const REFETCH_INTERVAL = 30000; // 30 seconds

export default function DashboardPage() {
  const {data: propertyMetrics, isLoading: loadingProperties} = useQuery<{data: PropertyMetrics}>({
    queryKey: ['analytics', 'properties'],
    queryFn: () => api.get('/api/analytics/properties'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const {data: tenantMetrics, isLoading: loadingTenants} = useQuery<{data: TenantMetrics}>({
    queryKey: ['analytics', 'tenants'],
    queryFn: () => api.get('/api/analytics/tenants'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const {data: financialMetrics, isLoading: loadingFinances} = useQuery<{data: FinancialMetrics}>({
    queryKey: ['analytics', 'finances'],
    queryFn: () => api.get('/api/analytics/finances'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const {data: maintenanceMetrics, isLoading: loadingMaintenance} = useQuery<{
    data: MaintenanceMetrics;
  }>({
    queryKey: ['analytics', 'maintenance'],
    queryFn: () => api.get('/api/analytics/maintenance'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const {data: trends} = useQuery<{data: TimeSeriesData[]}>({
    queryKey: ['analytics', 'trends'],
    queryFn: () => api.get('/api/analytics/trends?trend_metric=revenue'),
    refetchInterval: REFETCH_INTERVAL,
  });

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title='Total Properties'
            value={propertyMetrics?.data?.total_properties || 0}
            icon={<Home />}
            isLoading={loadingProperties}
            trend={{
              value: 5,
              direction: 'up',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title='Active Tenants'
            value={tenantMetrics?.data?.active_tenants || 0}
            icon={<Users />}
            isLoading={loadingTenants}
            trend={{
              value: 2,
              direction: 'up',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title='Monthly Revenue'
            value={financialMetrics?.data?.total_revenue || 0}
            icon={<DollarSign />}
            isLoading={loadingFinances}
            trend={{
              value: 8,
              direction: 'up',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title='Open Work Orders'
            value={maintenanceMetrics?.data?.open_work_orders || 0}
            icon={<Tool />}
            isLoading={loadingMaintenance}
            trend={{
              value: 3,
              direction: 'down',
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AnalyticsChart title='Revenue Trend' data={trends?.data || []} valuePrefix='$' />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsChart
            title='Occupancy Rate'
            data={trends?.data || []}
            valueSuffix='%'
            color='#4CAF50'
          />
        </Grid>
      </Grid>
    </div>
  );
}
