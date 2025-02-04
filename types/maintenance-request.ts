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
