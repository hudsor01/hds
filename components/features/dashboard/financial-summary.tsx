'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/Card/card'
import { formatCurrency } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface FinancialSummaryProps {
  totalRevenue: number
  totalExpenses: number
  netIncome: number
  occupancyRate: number
  monthlyData: {
    month: string
    revenue: number
    expenses: number
    netIncome: number
  }[]
}

export function FinancialSummary({ totalRevenue, totalExpenses, netIncome, occupancyRate, monthlyData }: FinancialSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-muted-foreground text-xs">Monthly rental income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-muted-foreground text-xs">Monthly operating costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(netIncome)}</div>
            <p className="text-muted-foreground text-xs">Monthly profit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-muted-foreground text-xs">Current occupancy</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" stroke="currentColor" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={value => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background rounded-lg border p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-muted-foreground text-[0.70rem] uppercase">{label}</span>
                              <span className="text-muted-foreground font-bold">Revenue</span>
                              <span className="font-bold text-blue-500">
                                {formatCurrency((payload[0]?.value as number) ?? 0)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-muted-foreground font-bold">Expenses</span>
                              <span className="font-bold text-red-500">{formatCurrency((payload[1]?.value as number) ?? 0)}</span>
                              <span className="text-muted-foreground font-bold">Net Income</span>
                              <span className="font-bold text-green-500">
                                {formatCurrency((payload[2]?.value as number) ?? 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={false} name="Expenses" />
                <Line type="monotone" dataKey="netIncome" stroke="#10B981" strokeWidth={2} dot={false} name="Net Income" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
