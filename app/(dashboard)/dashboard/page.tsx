'use client';

import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import MetricCard from '@/components/analytics/MetricCard';
import { api } from '@/lib/api';
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
import { checkRole } from '../../../utils/roles';

const REFETCH_INTERVAL = 30000; // 30 seconds

// Fetch metrics based on role
const { data: propertyMetrics, isLoading: loadingProperties } = useQuery<{
  data: PropertyMetrics;
}>({
  queryKey: ['analytics', 'properties', checkRole('admin')],
  queryFn: () => api.get('/api/analytics/properties'),
  enabled: checkRole('admin'),
  refetchInterval: REFETCH_INTERVAL,
});

const { data: tenantMetrics, isLoading: loadingTenants } = useQuery<{
  data: TenantMetrics;
}>({
  queryKey: ['analytics', 'tenants', role],
  queryFn: () => api.get('/api/analytics/tenants'),
  enabled: permissions.canViewAllTenants || role === 'TENANT',
  refetchInterval: REFETCH_INTERVAL,
});

const { data: financialMetrics, isLoading: loadingFinances } = useQuery<{
  data: FinancialMetrics;
}>({
  queryKey: ['analytics', 'finances', role],
  queryFn: () => api.get('/api/analytics/finances'),
  enabled: permissions.canViewAllPayments || role === 'TENANT',
  refetchInterval: REFETCH_INTERVAL,
});

const { data: maintenanceMetrics, isLoading: loadingMaintenance } = useQuery<{
  data: MaintenanceMetrics;
}>({
  queryKey: ['analytics', 'maintenance', role],
  queryFn: () => api.get('/api/analytics/maintenance'),
  enabled: permissions.canViewAllProperties || role === 'TENANT',
  refetchInterval: REFETCH_INTERVAL,
});

const { data: trends } = useQuery<{ data: TimeSeriesData[] }>({
  queryKey: ['analytics', 'trends', role],
  queryFn: () => api.get('/api/analytics/trends?trend_metric=revenue'),
  enabled: permissions.canViewReports || role === 'TENANT',
  refetchInterval: REFETCH_INTERVAL,
});

// Customize metrics based on role
const getMetricTitle = () => {
  switch (role) {
    case 'TENANT':
      return 'My Property';
    case 'LANDLORD':
      return 'My Properties';
    default:
      return 'Total Properties';
  }
};

const getFinancialTitle = () => {
  switch (role) {
    case 'TENANT':
      return 'Total Payments';
    case 'LANDLORD':
      return 'Total Revenue';
    default:
      return 'Monthly Revenue';
  }
};

export const useRoleBasedAccess = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserRoleAndPermissions = async () => {
      const user = supabase.auth.user();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role, permissions')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role and permissions:', error);
        } else {
          setRole(data.role as UserRole);
          setPermissions(data.permissions || []);
        }
      }
    };

    fetchUserRoleAndPermissions();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {role === 'TENANT' ? 'My Dashboard' : 'Dashboard'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(permissions.canViewAllProperties || role === 'TENANT') && (
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title={getMetricTitle()}
              value={propertyMetrics?.data?.total_properties || 0}
              icon={<Home />}
              isLoading={loadingProperties}
              trend={
                role !== 'TENANT'
                  ? {
                      value: 5,
                      direction: 'up',
                    }
                  : undefined
              }
            />
          </Grid>
        )}

        {(permissions.canViewAllTenants || role === 'TENANT') && (
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title={role === 'TENANT' ? 'Active Lease' : 'Active Tenants'}
              value={tenantMetrics?.data?.active_tenants || 0}
              icon={<Users />}
              isLoading={loadingTenants}
              trend={
                role !== 'TENANT'
                  ? {
                      value: 2,
                      direction: 'up',
                    }
                  : undefined
              }
            />
          </Grid>
        )}

        {(permissions.canViewAllPayments || role === 'TENANT') && (
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title={getFinancialTitle()}
              value={financialMetrics?.data?.total_revenue || 0}
              icon={<DollarSign />}
              isLoading={loadingFinances}
              trend={
                role !== 'TENANT'
                  ? {
                      value: 8,
                      direction: 'up',
                    }
                  : undefined
              }
            />
          </Grid>
        )}

        {(permissions.canViewAllProperties || role === 'TENANT') && (
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Maintenance Requests"
              value={maintenanceMetrics?.data?.open_work_orders || 0}
              icon={<Tool />}
              isLoading={loadingMaintenance}
              trend={
                role !== 'TENANT'
                  ? {
                      value: 3,
                      direction: 'down',
                    }
                  : undefined
              }
            />
          </Grid>
        )}
      </Grid>

      {(permissions.canViewReports || role === 'TENANT') && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AnalyticsChart
              title={role === 'TENANT' ? 'Payment History' : 'Revenue Trend'}
              data={trends?.data || []}
              valuePrefix="$"
            />
          </Grid>
          {role !== 'TENANT' && (
            <Grid item xs={12} md={4}>
              <AnalyticsChart
                title="Occupancy Rate"
                data={trends?.data || []}
                valueSuffix="%"
                color="#4CAF50"
              />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};
