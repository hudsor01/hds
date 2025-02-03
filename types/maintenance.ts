export type MaintenanceRequest = {
  id: string;
  propertyId: string;
  unitId?: string;
  tenantId?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};

export type NewMaintenanceRequest = Omit<
  MaintenanceRequest,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>;

export type UpdateMaintenanceRequest = Partial<MaintenanceRequest> & {id: string};

export type MaintenanceTicket = MaintenanceRequest & {
  propertyName: string;
  unitNumber?: string;
  assignedTo?: string;
  comments: Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: Date;
    attachments?: Array<{
      id: string;
      name: string;
      url: string;
    }>;
  }>;
};

export type NewMaintenanceTicket = Omit<
  MaintenanceRequest,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>;

export type UpdateMaintenanceTicket = Partial<MaintenanceTicket> & {id: string};

export type MaintenanceStatus = MaintenanceRequest['status'];
export type MaintenancePriority = MaintenanceRequest['priority'];
