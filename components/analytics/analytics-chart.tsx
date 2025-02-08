'use client';

import { TimeSeriesData } from '@/types/analytics';
import {
  Card,
  CardContent,
  CardHeader,
  useTheme,
} from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AnalyticsChartProps {
  title: string;
  data: TimeSeriesData[];
  valuePrefix?: string;
  valueSuffix?: string;
  color?: string;
}

export default function AnalyticsChart({
  title,
  data,
  valuePrefix = '',
  valueSuffix = '',
  color,
}: AnalyticsChartProps) {
  const theme = useTheme();

  const formatValue = (value: number) => {
    return `${valuePrefix}${value.toLocaleString()}${valueSuffix}`;
  };

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="date"
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '12px' }}
              tickFormatter={formatValue}
            />
            <Tooltip
              formatter={(value: number) => formatValue(value)}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color || theme.palette.primary.main}
              fill={color || theme.palette.primary.main}
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
