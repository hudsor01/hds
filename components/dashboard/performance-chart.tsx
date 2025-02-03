'use client';

import {Box} from '@mui/material';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    name: string;
    revenue: number;
    expenses: number;
  }>;
}

export function PerformanceChart({data}: PerformanceChartProps) {
  return (
    <Box sx={{width: '100%', height: 300}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='revenue' stroke='#2196f3' strokeWidth={2} dot={false} />
          <Line type='monotone' dataKey='expenses' stroke='#f44336' strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
