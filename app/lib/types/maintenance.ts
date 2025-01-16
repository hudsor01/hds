export type MaintenanceStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent'

export interface MaintenanceTicket {
  id: string
  title: string
  description: string
  status: MaintenanceStatus
  priority: MaintenancePriority
  propertyId: string
  propertyName: string
  unitId?: string
  unitNumber?: string
  createdBy: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  attachments?: string[]
  comments: MaintenanceComment[]
}

export interface MaintenanceComment {
  id: string
  ticketId: string
  content: string
  createdBy: string
  createdAt: string
  attachments?: string[]
}

export interface NewMaintenanceTicket {
  title: string
  description: string
  priority: MaintenancePriority
  propertyId: string
  unitId?: string
}

export interface UpdateMaintenanceTicket {
  id: string
  status?: MaintenanceStatus
  priority?: MaintenancePriority
  assignedTo?: string
  description?: string
}
