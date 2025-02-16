'use client'

import { useState, useEffect } from 'react'
import { FinancialSummary } from '@/components/dashboard/financial-summary'
import { MaintenanceTracker } from '@/components/dashboard/maintenance-tracker'
import { fetchDashboardData } from '@/lib/api/dashboard'
import { useToast } from '@/components/ui/use-toast'

export default function DashboardPage() {
  const [data, setData] = useState({
    financialData: {
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,
      occupancyRate: 0,
      monthlyData: []
    },
    maintenanceRequests: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true)
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <FinancialSummary {...data.financialData} />
      <MaintenanceTracker 
        requests={data.maintenanceRequests}
        onViewRequest={(request) => {
          // Handle view request
        }}
      />
    </div>
  )
}