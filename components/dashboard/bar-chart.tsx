'use client'

import { Box } from '@mui/material'
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface BarChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export function BarChart({ data }: BarChartProps) {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1976d2" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  )
}
