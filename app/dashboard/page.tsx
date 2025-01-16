'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Home, Key, Users } from "react-feather"

export default function DashboardPage() {
  const [dateRange] = useState("Oct 13, 2024 - Jan 13, 2025")

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here is an overview of your properties.</p>
        </div>
        <div className="text-sm text-gray-500">{dateRange}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Action Cards */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Add Property</h3>
            </div>
            <div className="ml-auto">
              <Button variant="ghost" size="icon">+</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Add Tenant</h3>
            </div>
            <div className="ml-auto">
              <Button variant="ghost" size="icon">+</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Create Lease</h3>
            </div>
            <div className="ml-auto">
              <Button variant="ghost" size="icon">+</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overview Metrics */}
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <span className="text-xs text-green-500">+12.3%</span>
            </div>
            <div className="text-2xl font-bold">$148,500</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Active Tenants</span>
              <span className="text-xs text-green-500">+4.5%</span>
            </div>
            <div className="text-2xl font-bold">126</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Properties</span>
              <span className="text-xs text-green-500">+1</span>
            </div>
            <div className="text-2xl font-bold">15</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-[300px] relative">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-t from-blue-50 to-transparent rounded" />
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" className="text-sm text-blue-500">View All Activity</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Key className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">New lease signed by John Doe</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Maintenance request completed at Unit 101</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">New property listed: Sunset Heights</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
