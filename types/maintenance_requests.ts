export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Comment {
  content: string;
  created_at: string;
  created_by?: string;
  attachments?: Array<{
    url: string;
    name: string;
    type: string;
  }>;
}

export interface MaintenanceRequest {
  id: string;
  property_id: string;
  unit_id: string;
  tenant_id: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assigned_to?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}

export type NewMaintenanceRequest = Omit<
  MaintenanceRequest,
  'id' | 'status' | 'created_at' | 'updated_at' | 'completed_at' | 'assigned_to' | 'comments'
>;

export type UpdateMaintenanceRequest = Partial<
  Omit<MaintenanceRequest, 'id' | 'created_at' | 'updated_at'>
> & {
  id: string;
};

export interface MaintenanceRequestWithRelations extends MaintenanceRequest {
  property?: {
    id: string;
    name: string;
  };
  unit?: {
    id: string;
    number: string;
  };
  tenant?: {
    id: string;
    name: string;
    email: string;
  };
  assigned_user?: {
    id: string;
    name: string;
    email: string;
  };
}

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
  'id' | 'status' | 'created_at' | 'updated_at' | 'completed_at' | 'assigned_to'
>;

export type UpdateMaintenanceTicket = Partial<MaintenanceTicket> & {
  id: string;
};
