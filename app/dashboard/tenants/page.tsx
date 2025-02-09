'use client'

import { Button } from '@/components/ui/buttons/button'
import { useState } from 'react'

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  propertyName: string
  unitId: string
  leaseEnd: string
  status: 'active' | 'inactive' | 'pending'
}

export default function TenantsPage() {
  const [tenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      propertyId: '1',
      propertyName: 'Sunset Apartments',
      unitId: '101',
      leaseEnd: '12/30/2024',
      status: 'active',
    },
  ])

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tenants</h1>
          <p className="text-gray-500">Manage your tenants and leases</p>
        </div>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">+ Add Tenant</Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-1 text-sm text-gray-500">Total Tenants</h3>
          <p className="text-2xl font-bold">{tenants.length}</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-1 text-sm text-gray-500">Active Leases</h3>
          <p className="text-2xl font-bold">
            {tenants.filter((t) => t.status === 'active').length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Lease Ends
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{tenant.email}</div>
                  <div className="text-sm text-gray-500">{tenant.phone}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{tenant.propertyName}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{tenant.unitId}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{tenant.leaseEnd}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold capitalize leading-5 text-green-800">
                    {tenant.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Button variant="outline" className="text-blue-600 hover:text-blue-900">
                    ...
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
