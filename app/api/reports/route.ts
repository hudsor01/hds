import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Helper function to calculate occupancy rate
const calculateOccupancyRate = (totalUnits: number, occupiedUnits: number) => {
  return totalUnits === 0 ? 0 : (occupiedUnits / totalUnits) * 100
}

const propertyName = request.property.name

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const reportType = searchParams.get('type')
    const startDate = searchParams.get('startDate')
      ? new Date(searchParams.get('startDate')!)
      : new Date(new Date().setMonth(new Date().getMonth() - 1))
    const endDate = searchParams.get('endDate')
      ? new Date(searchParams.get('endDate')!)
      : new Date()

    switch (reportType) {
      case 'financial': {
        // Get financial metrics
        const [properties, leases, expenses] = await Promise.all([
          prisma.properties.findMany({
            where: { user_id: userId },
            select: { rent_amount: true }
          }),
          prisma.leases.findMany({
            where: {
              user_id: userId,
              status: 'Active',
              created_at: {
                gte: startDate,
                lte: endDate
              }
            },
            select: {
              rent_amount: true,
              depositAmount: true
            }
          }),
          prisma.expenses.findMany({
            where: {
              created_by: userId,
              date: {
                gte: startDate,
                lte: endDate
              }
            },
            select: {
              amount: true,
              category: true
            }
          })
        ])

        const totalPotentialIncome = properties.reduce(
          (sum, prop) => sum + Number(prop.rent_amount),
          0
        )
        const actualIncome = leases.reduce((sum, lease) => sum + Number(lease.rent_amount), 0)
        const totalDeposits = leases.reduce((sum, lease) => sum + Number(lease.depositAmount), 0)
        const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

        // Group expenses by category
        const expensesByCategory = expenses.reduce(
          (acc, expense) => {
            const category = expense.category
            acc[category] = (acc[category] || 0) + Number(expense.amount)
            return acc
          },
          {} as Record<string, number>
        )

        return NextResponse.json({
          totalPotentialIncome,
          actualIncome,
          totalDeposits,
          totalExpenses,
          netIncome: actualIncome - totalExpenses,
          occupancyRate: calculateOccupancyRate(properties.length, leases.length),
          expensesByCategory,
          period: { startDate, endDate }
        })
      }

      case 'occupancy': {
        // Get occupancy metrics
        const [properties, activeLeases] = await Promise.all([
          prisma.properties.findMany({
            where: { user_id: userId },
            include: {
              leases: {
                where: {
                  status: 'Active'
                }
              }
            }
          }),
          prisma.leases.findMany({
            where: {
              user_id: userId,
              status: 'Active'
            },
            include: {
              property: true
            }
          })
        ])

        const occupancyByPropertyType = properties.reduce(
          (acc, property) => {
            const type = property.type
            if (!acc[type]) {
              acc[type] = {
                total: 0,
                occupied: 0,
                rate: 0
              }
            }
            acc[type].total++
            acc[type].occupied += property.leases.length > 0 ? 1 : 0
            acc[type].rate = calculateOccupancyRate(acc[type].total, acc[type].occupied)
            return acc
          },
          {} as Record<string, { total: number; occupied: number; rate: number }>
        )

        return NextResponse.json({
          totalProperties: properties.length,
          occupiedProperties: activeLeases.length,
          overallOccupancyRate: calculateOccupancyRate(properties.length, activeLeases.length),
          occupancyByPropertyType,
          period: { startDate, endDate }
        })
      }

      case 'maintenance': {
        // Get maintenance metrics
        const maintenanceRequests = await prisma.maintenance_requests.findMany({
          where: {
            user_id: userId,
            created_at: {
              gte: startDate,
              lte: endDate
            }
          },
          include: {
            property: true
          }
        })

        const requestsByStatus = maintenanceRequests.reduce(
          (acc, request) => {
            const status = request.status || 'UNKNOWN'
            acc[status] = (acc[status] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const requestsByPriority = maintenanceRequests.reduce(
          (acc, request) => {
            const priority = request.priority || 'UNKNOWN'
            acc[priority] = (acc[priority] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const requestsByProperty = maintenanceRequests.reduce(
          (acc, request) => {
            if (request.property) {
              const propertyName = request.property.name
              acc[propertyName] = (acc[propertyName] || 0) + 1
            }
            return acc
          },
          {} as Record<string, number>
        )

        return NextResponse.json({
          totalRequests: maintenanceRequests.length,
          requestsByStatus,
          requestsByPriority,
          requestsByProperty,
          period: { startDate, endDate }
        })
      }

      case 'leases': {
        // Get lease metrics
        const leases = await prisma.leases.findMany({
          where: {
            user_id: userId,
            created_at: {
              gte: startDate,
              lte: endDate
            }
          },
          include: {
            property: true
          }
        })

        const leasesByStatus = leases.reduce(
          (acc, lease) => {
            const status = lease.status || 'UNKNOWN'
            acc[status] = (acc[status] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const leasesByType = leases.reduce(
          (acc, lease) => {
            const type = lease.type
            acc[type] = (acc[type] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const upcomingRenewals = leases
          .filter(
            lease =>
              lease.status === 'Active' &&
              lease.end_date &&
              new Date(lease.end_date) <= new Date(new Date().setMonth(new Date().getMonth() + 2))
          )
          .map(lease => ({
            leaseId: lease.user_id,
            propertyName: lease.property.name,
            endDate: lease.end_date
          }))

        return NextResponse.json({
          totalLeases: leases.length,
          leasesByStatus,
          leasesByType,
          upcomingRenewals,
          averageLeaseAmount:
            leases.reduce((sum, lease) => sum + Number(lease.rent_amount), 0) / leases.length,
          period: { startDate, endDate }
        })
      }

      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Reports API Error:', error)
    return NextResponse.json({ error: 'Error generating report' }, { status: 500 })
  }
}
