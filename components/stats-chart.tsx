'use client'

import { Card } from '@/components/card'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface StatsChartProps {
  data: {
    name: string
    value: number
  }[]
  title: string
  formatter?: (value: number) => string
}

export function StatsChart({ data, title, formatter }: StatsChartProps) {
  const defaultFormatter = (value: number) => value.toString()
  const formatValue = formatter || defaultFormatter

  return (
    <Card className="p-4">
      <h3 className="mb-4 text-sm font-medium">{title}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatValue} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(31 41 55)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
              formatter={(value: number) => [formatValue(value), title]}
              labelStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
