'use client';

import { useState } from 'react';
import { Card, CardContent, Box, Typography, IconButton, ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data - this would come from your API
const monthlyData = [
  { name: 'Jan', revenue: 45000, expenses: 32000, collected: 42000 },
  { name: 'Feb', revenue: 52000, expenses: 34000, collected: 48000 },
  { name: 'Mar', revenue: 48000, expenses: 33000, collected: 45000 },
  { name: 'Apr', revenue: 51000, expenses: 35000, collected: 47000 },
  { name: 'May', revenue: 54000, expenses: 36000, collected: 50000 },
  { name: 'Jun', revenue: 49000, expenses: 32000, collected: 46000 },
  { name: 'Jul', revenue: 52000, expenses: 35000, collected: 48000 },
  { name: 'Aug', revenue: 50000, expenses: 34000, collected: 47000 },
  { name: 'Sep', revenue: 53000, expenses: 37000, collected: 49000 },
  { name: 'Oct', revenue: 55000, expenses: 38000, collected: 51000 },
  { name: 'Nov', revenue: 54000, expenses: 36000, collected: 50000 },
  { name: 'Dec', revenue: 58000, expenses: 39000, collected: 54000 }
];

const quarterlyData = [
  { name: 'Q1', revenue: 145000, expenses: 99000, collected: 135000 },
  { name: 'Q2', revenue: 154000, expenses: 103000, collected: 143000 },
  { name: 'Q3', revenue: 155000, expenses: 106000, collected: 144000 },
  { name: 'Q4', revenue: 167000, expenses: 113000, collected: 155000 }
];

export function RevenueChart() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('monthly');
  const [hoveredData, setHoveredData] = useState(null);

  const handleTimeRangeChange = (event, newRange) => {
    if (newRange !== null) {
      setTimeRange(newRange);
    }
  };

  const data = timeRange === 'monthly' ? monthlyData : quarterlyData;

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{label}</Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ mb: 0.5 }}>
              <Typography
                variant="body2"
                sx={{ color: entry.color, display: 'flex', alignItems: 'center' }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: entry.color,
                    mr: 1
                  }}
                />
                {entry.name}: ${entry.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: '100%', minHeight: 400 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Revenue Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
            >
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="quarterly">Quarterly</ToggleButton>
            </ToggleButtonGroup>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              onMouseMove={(data) => {
                if (data.isTooltipActive) {
                  setHoveredData(data.activePayload);
                } else {
                  setHoveredData(null);
                }
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="name"
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.secondary }}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.secondary }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2563EB"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="collected"
                name="Collected"
                stroke="#059669"
                fillOpacity={1}
                fill="url(#colorCollected)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#DC2626"
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Box
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.1)
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h6" color="primary.main">
              ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 1,
              bgcolor: alpha('#059669', 0.1)
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">Total Collected</Typography>
            <Typography variant="h6" color="#059669">
              ${data.reduce((sum, item) => sum + item.collected, 0).toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 1,
              bgcolor: alpha('#DC2626', 0.1)
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">Total Expenses</Typography>
            <Typography variant="h6" color="#DC2626">
              ${data.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
