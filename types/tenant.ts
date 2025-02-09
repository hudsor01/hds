export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  propertyName: string
  unitId: string
  leaseEnd: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export type NewTenant = Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTenant = Partial<Tenant> & { id: string }
