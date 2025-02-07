'use client';

import {Card} from '@/components/ui/cards/card';
import {auth} from '@clerk/nextjs';
import {Box, Container, Grid, Typography} from '@mui/material';
import {redirect} from 'next/navigation';
import {BarChart2, DollarSign, Home as HomeIcon, Users} from 'react-feather';

const stats = [
  {
    name: 'Total Properties',
    value: '12',
    change: '+2',
    changeType: 'increase',
    icon: HomeIcon,
  },
  {
    name: 'Active Tenants',
    value: '48',
    change: '+5',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Monthly Revenue',
    value: '$52,000',
    change: '+12%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Occupancy Rate',
    value: '94%',
    change: '+3%',
    changeType: 'increase',
    icon: BarChart2,
  },
];

export default async function DashboardPage() {
  const {userId} = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <Container maxWidth='xl' className='py-6'>
      <Box className='mb-8'>
        <Typography variant='h4' component='h1' className='font-bold'>
          Dashboard
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Welcome back! Here's an overview of your properties.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.name}>
            <Card className='p-6 hover:shadow-lg transition-shadow'>
              <div className='flex items-center justify-between'>
                <div>
                  <Typography variant='h6' className='font-semibold'>
                    {stat.value}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {stat.name}
                  </Typography>
                </div>
                <div className='rounded-full bg-primary/10 p-3'>
                  <stat.icon className='h-6 w-6 text-primary' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <span className='text-sm font-medium text-success-500'>{stat.change}</span>
                <span className='ml-2 text-sm text-muted-foreground'>from last month</span>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add more dashboard sections here */}
    </Container>
  );
}
