'use client';

import {Button} from '@/components/ui/buttons/button';
import type {Lease} from '@/types/lease';
import {LEASE_STATUS} from '@/types/lease';
import type {Property} from '@/types/property';
import LeaseDialog from 'components/dialogs/lease-dialog';
import {useState} from 'react';
import {Edit, Plus, Trash} from 'react-feather';

// Mock data for initial development
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90028',
    type: 'apartment',
    status: 'active',
    units: [
      {
        id: '101',
        number: '101',
        bedrooms: 2,
        bathrooms: 1,
        sqft: 800,
        rent: 2000,
        status: 'occupied',
      },
      {
        id: '102',
        number: '102',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 600,
        rent: 1500,
        status: 'vacant',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockLeases: Lease[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Sunset Apartments',
    unitId: '101',
    unitNumber: '101',
    tenantId: 't1',
    tenantName: 'John Doe',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    rentAmount: 2000,
    securityDeposit: 2000,
    paymentFrequency: 'monthly',
    status: 'active',
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function LeasesPage() {
  const [leases, setLeases] = useState<Lease[]>(mockLeases);
  const [selectedLease, setSelectedLease] = useState<Lease | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddLease = async (
    leaseData: Omit<Lease, 'id' | 'createdAt' | 'updatedAt' | 'documents'>,
  ) => {
    // In a real app, this would be an API call
    const newLease: Lease = {
      ...leaseData,
      id: Math.random().toString(),
      documents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLeases([...leases, newLease]);
  };

  const handleEditLease = async (
    leaseData: Omit<Lease, 'id' | 'createdAt' | 'updatedAt' | 'documents'>,
  ) => {
    if (!selectedLease) return;

    // In a real app, this would be an API call
    const updatedLease: Lease = {
      ...leaseData,
      id: selectedLease.id,
      documents: selectedLease.documents,
      createdAt: selectedLease.createdAt,
      updatedAt: new Date(),
    };

    setLeases(leases.map(l => (l.id === selectedLease.id ? updatedLease : l)));
  };

  const handleDeleteLease = async (leaseId: string) => {
    // In a real app, this would be an API call
    if (confirm('Are you sure you want to delete this lease?')) {
      setLeases(leases.filter(l => l.id !== leaseId));
    }
  };

  const getStatusColor = (status: keyof typeof LEASE_STATUS) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      case 'terminated':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Leases</h1>
          <p className='text-gray-500'>Manage your property leases</p>
        </div>
        <Button
          onClick={() => {
            setSelectedLease(undefined);
            setIsDialogOpen(true);
          }}
        >
          <Plus className='w-4 h-4 mr-2' />
          Add Lease
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Property</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Unit</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Tenant</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Dates</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Rent</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Status</th>
                <th className='px-6 py-3 text-sm font-medium text-gray-500'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {leases.map(lease => (
                <tr key={lease.id}>
                  <td className='px-6 py-4'>{lease.propertyName}</td>
                  <td className='px-6 py-4'>Unit {lease.unitNumber}</td>
                  <td className='px-6 py-4'>{lease.tenantName}</td>
                  <td className='px-6 py-4'>
                    {new Date(lease.startDate).toLocaleDateString()} -{' '}
                    {new Date(lease.endDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4'>${lease.rentAmount.toLocaleString()}</td>
                  <td className='px-6 py-4'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lease.status)}`}
                    >
                      {lease.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                          setSelectedLease(lease);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button variant='ghost' size='sm' onClick={() => handleDeleteLease(lease.id)}>
                        <Trash className='w-4 h-4' />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LeaseDialog
        open={isDialogOpen}
        onOpenChangeAction={setIsDialogOpen}
        lease={selectedLease}
        properties={mockProperties}
        onSubmitAction={selectedLease ? handleEditLease : handleAddLease}
      />
    </div>
  );
}
