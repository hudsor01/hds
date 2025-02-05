// components/dashboard/revenue-chart.tsx
'use client';

import {Card} from '@/components/ui/card';
import {useQuery} from '@tanstack/react-query';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

// components/dashboard/revenue-chart.tsx

export function RevenueChart() {
  const {data: chartData, isLoading} = useQuery({
    queryKey: ['revenueData'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/revenue');
      return response.json();
    },
  });

  return (
    <Card className='p-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-medium text-gray-900'>Revenue Overview</h3>
        <p className='text-sm text-gray-500'>Monthly revenue trends</p>
      </div>

      <div className='h-[300px] mt-4'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='revenue' stroke='#3b82f6' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

RevenueChart.Skeleton = function Skeleton() {
  return (
    <Card className='p-6'>
      <div className='animate-pulse'>
        <div className='h-4 bg-gray-200 rounded w-48 mb-4' />
        <div className='h-[300px] bg-gray-200 rounded' />
      </div>
    </Card>
  );
};
