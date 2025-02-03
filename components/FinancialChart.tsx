// components/FinancialChart.tsx
'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

// components/FinancialChart.tsx

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface FinancialChartProps {
  data: FinancialData[];
  title?: string;
}

export default function FinancialChart({data, title = 'Financial Overview'}: FinancialChartProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(value)
                }
              />
              <Bar dataKey='revenue' name='Revenue' fill='#4f46e5' />
              <Bar dataKey='expenses' name='Expenses' fill='#ef4444' />
              <Bar dataKey='profit' name='Profit' fill='#22c55e' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
