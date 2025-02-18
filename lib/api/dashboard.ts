'use server'

import { createClient, handleDatabaseError } from '@/lib/supabase'

export async function fetchDashboardData() {
  try {
    const supabase = await createClient()

    // Fetch properties with their maintenance requests
    const { data: propertiesData, error: propertiesError } = await supabase
      .from('properties')
      .select(
        `
        id,
        name,
        monthly_rent,
        expenses,
        status,
        maintenance_requests (
          id,
          description,
          priority,
          status,
          created_at,
          updated_at,
          estimated_cost,
          assigned_to
        )
      `
      )
      .order('created_at', { ascending: false })

    if (propertiesError) {
      throw propertiesError
    }

    if (!propertiesData) {
      throw new Error('No properties data returned')
    }

    // Calculate financial metrics
    const totalRevenue = propertiesData.reduce((sum, p) => sum + (p.monthly_rent || 0), 0)
    const totalExpenses = propertiesData.reduce(
      (sum, p) => sum + Object.values(p.expenses || {}).reduce((a, b) => a + (b || 0), 0),
      0
    )

    // Calculate occupancy rate
    const totalUnits = propertiesData.length
    const occupiedUnits = propertiesData.filter(p => p.status === 'ACTIVE').length
    const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0

    // Fetch historical financial data
    const { data: historicalData, error: historicalError } = await supabase
      .from('financial_history')
      .select('*')
      .order('month', { ascending: false })
      .limit(6)

    if (historicalError) {
      throw historicalError
    }

    if (!historicalData) {
      throw new Error('No historical data returned')
    }

    // Process maintenance requests
    const maintenanceRequests = propertiesData
      .flatMap(property =>
        (property.maintenance_requests || []).map(request => ({
          ...request,
          propertyName: property.name
        }))
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    interface MonthlyFinancialRecord {
      month: string
      revenue: number
      expenses: number
      netIncome: number
    }

    interface DashboardFinancialData {
      totalRevenue: number
      totalExpenses: number
      netIncome: number
      occupancyRate: number
      monthlyData: MonthlyFinancialRecord[]
    }

    interface DashboardResult {
      financialData: DashboardFinancialData
      maintenanceRequests: (MaintenanceRequest & { propertyName: string })[]
    }

    return {
      financialData: {
        totalRevenue,
        totalExpenses,
        netIncome: totalRevenue - totalExpenses,
        occupancyRate,
        monthlyData: historicalData
          .map(record => ({
            month: new Date(record.month).toLocaleString('default', { month: 'short' }),
            revenue: record.revenue,
            expenses: record.expenses,
            netIncome: record.revenue - record.expenses
          }))
          .reverse()
      },
      maintenanceRequests
    } as DashboardResult
  } catch (error) {
    return handleDatabaseError(error)
  }
}

export async function updateMaintenanceStatus(requestId: string, newStatus: MaintenanceRequest['status']) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('maintenance_requests')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)
      .select()
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data returned after update')
    }

    return data
  } catch (error) {
    return handleDatabaseError(error)
  }
}
