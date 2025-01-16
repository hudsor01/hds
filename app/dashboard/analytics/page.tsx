'use client'

import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function AnalyticsPage() {
  const [selectedMonth] = useState("Mar 24")

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Performance</h2>
          <div className="relative h-[300px]">
            <div className="absolute inset-0">
              {/* Area Chart */}
              <div className="relative h-full">
                <div className="absolute left-0 bottom-0 w-full h-full bg-gradient-to-t from-blue-100/50 to-transparent" />
                <div className="absolute left-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-red-100/50 to-transparent" />
                <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-green-100/50 to-transparent" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">Revenue : $48,900</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500">Expenses : $33,200</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">Profit : $15,700</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tenant Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tenant Activity</h2>
          <div className="relative h-[300px] flex items-center justify-center">
            <div className="w-48 h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="40, 100"
                  className="rotate-[-90deg] origin-center"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeDasharray="35, 100"
                  className="rotate-[50deg] origin-center"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="25, 100"
                  className="rotate-[180deg] origin-center"
                />
              </svg>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>New Leases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Renewals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Move-outs</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Occupancy Rates */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Property Occupancy Rates</h2>
          <div className="h-[300px] flex items-end justify-between gap-8">
            {["Town Apartments", "Sunset Heights", "Ocean View Complex"].map((property) => (
              <div key={property} className="flex-1">
                <div className="h-48 bg-blue-500 rounded-t-lg" />
                <p className="text-sm mt-2 text-center">{property}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
          <div className="relative h-[300px] flex items-center justify-center">
            <div className="w-48 h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="75, 100" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="8"
                  strokeDasharray="10, 100"
                  className="rotate-[270deg] origin-center"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="8"
                  strokeDasharray="8, 100"
                  className="rotate-[306deg] origin-center"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#67E8F9"
                  strokeWidth="8"
                  strokeDasharray="7, 100"
                  className="rotate-[335deg] origin-center"
                />
              </svg>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Rental Income (75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span>Parking Fees (10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span>Amenities (8%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-300" />
                <span>Other (7%)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tenant Insights */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Tenant Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tenant Satisfaction Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tenant Satisfaction Trend</h3>
            <div className="h-[200px] flex items-end">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-[80%] bg-gradient-to-t from-blue-100/50 to-transparent rounded" />
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance Requests */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Maintenance Requests</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Open</p>
                  <p className="text-sm text-gray-500">Avg. Resolution: 2.5 days</p>
                </div>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">In Progress</p>
                  <p className="text-sm text-gray-500">Avg. Resolution: 1.8 days</p>
                </div>
                <span className="text-2xl font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Completed</p>
                  <p className="text-sm text-gray-500">Avg. Resolution: 1.2 days</p>
                </div>
                <span className="text-2xl font-bold">45</span>
              </div>
            </div>
          </Card>

          {/* Tenant Retention */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tenant Retention</h3>
            <div className="h-[200px] flex items-end gap-4">
              <div className="flex-1">
                <div className="h-[85%] bg-blue-200 rounded-t-lg" />
                <p className="text-sm mt-2 text-center">2023</p>
              </div>
              <div className="flex-1">
                <div className="h-[88%] bg-blue-500 rounded-t-lg" />
                <p className="text-sm mt-2 text-center">2024</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
