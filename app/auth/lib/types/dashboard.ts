export interface RecentActivity {
  id: string;
  type: 'APPLICATION' | 'MAINTENANCE' | 'PAYMENT';
  title: string;
  description: string;
  timestamp: string;
  status?: 'pending' | 'completed' | 'rejected';
  amount?: number;
  propertyId?: string;
  tenantId?: string;
  maintenanceId?: string;
  applicationId?: string;
  paymentId?: string;
}
