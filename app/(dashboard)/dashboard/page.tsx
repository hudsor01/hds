'use client';

import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import MetricCard from '@/components/analytics/MetricCard';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/components/providers/auth-provider';
import type {
  FinancialMetrics,
  MaintenanceMetrics,
  PropertyMetrics,
  TenantMetrics,
  TimeSeriesData,
  UserRole,
} from '@/types/analytics';
import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DollarSign, Home, Tool, Users } from 'react-feather';
import { checkRole } from '@/utils/roles';
import { supabase } from '@supabase/auth-ui-shared'

const REFETCH_INTERVAL = 30000; // 30 seconds

export default function DashboardPage() {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserRoleAndPermissions = async () => {
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
  }, [user]);

  const { data: propertyMetrics, isLoading: loadingProperties } = useQuery<{
    data: PropertyMetrics;
  }>({
    queryKey: ['analytics', 'properties', role],
    queryFn: () => apiClient.get('/api/analytics/properties'),
    enabled: !!role && (checkRole(role, 'admin') || permissions.includes('view_properties')),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: tenantMetrics, isLoading: loadingTenants } = useQuery<{
    data: TenantMetrics;
  }>({
    queryKey: ['analytics', 'tenants', role],
    queryFn: () => apiClient.get('/api/analytics/tenants'),
    enabled: !!role && (permissions.includes('view_tenants') || role === 'TENANT'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: financialMetrics, isLoading: loadingFinances } = useQuery<{
    data: FinancialMetrics;
  }>({
    queryKey: ['analytics', 'finances', role],
    queryFn: () => apiClient.get('/api/analytics/finances'),
    enabled: !!role && (permissions.includes('view_finances') || role === 'TENANT'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: maintenanceMetrics, isLoading: loadingMaintenance } = useQuery<{
    data: MaintenanceMetrics;
  }>({
    queryKey: ['analytics', 'maintenance', role],
    queryFn: () => apiClient.get('/api/analytics/maintenance'),
    enabled: !!role && (permissions.includes('view_maintenance') || role === 'TENANT'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: trends } = useQuery<{ data: TimeSeriesData[] }>({
    queryKey: ['analytics', 'trends', role],
    queryFn: () => apiClient.get('/api/analytics/trends?trend_metric=revenue'),
    enabled: !!role && (permissions.includes('view_reports') || role === 'TENANT'),
    refetchInterval: REFETCH_INTERVAL,
  });

  const getMetricTitle = () => {
    if (!role) return 'Properties';
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
    if (!role) return 'Revenue';
    switch (role) {
      case 'TENANT':
        return 'Total Payments';
      case 'LANDLORD':
        return 'Total Revenue';
      default:
        return 'Monthly Revenue';
    }
  };

  if (!role) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {role === 'TENANT' ? 'My Dashboard' : 'Dashboard'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(permissions.includes('view_properties') || role === 'TENANT') && (
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

        {(permissions.includes('view_tenants') || role === 'TENANT') && (
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

        {(permissions.includes('view_finances') || role === 'TENANT') && (
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

        {(permissions.includes('view_maintenance') || role === 'TENANT') && (
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

      {(permissions.includes('view_reports') || role === 'TENANT') && (
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
}
