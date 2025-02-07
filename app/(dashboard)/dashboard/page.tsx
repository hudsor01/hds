import {api} from '@/lib/api';
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Property Manager',
  description: 'View your property management overview and recent activity.',
};

('use client');

export default function DashboardPage() {
  const {data: properties} = useQuery({
    queryKey: ['properties'],
    queryFn: () => api.get('/api/properties'),
  });

  const {data: tenants} = useQuery({
    queryKey: ['tenants'],
    queryFn: () => api.get('/api/tenants'),
  });

  const {data: workOrders} = useQuery({
    queryKey: ['work-orders'],
    queryFn: () => api.get('/api/work-orders'),
  });

  const {data: recentActivity} = useQuery({
    queryKey: ['activity'],
    queryFn: () => api.get('/api/activity'),
  });

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Total Properties
              </Typography>
              <Typography variant='h3'>{properties?.data?.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Active Tenants
              </Typography>
              <Typography variant='h3'>
                {tenants?.data?.filter((t: any) => t.status === 'active')?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Open Work Orders
              </Typography>
              <Typography variant='h3'>
                {workOrders?.data?.filter((w: any) => w.status === 'PENDING')?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                Upcoming Inspections
              </Typography>
              <Typography variant='h3'>0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity?.data?.slice(0, 5)?.map((activity: any) => (
                  <ListItem key={activity.id}>
                    <ListItemText
                      primary={activity.description}
                      secondary={new Date(activity.created_at).toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Upcoming Tasks
              </Typography>
              <Box sx={{height: 300}} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
