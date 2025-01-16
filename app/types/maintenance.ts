import { ACTIVITY_STATUS, PRIORITY_LEVELS } from "@/lib/constants"

export type MaintenanceRequest = {
  id: string
  propertyId: string
  unitId: string
  tenantId: string
  title: string
  description: string
  priority: keyof typeof PRIORITY_LEVELS
  status: keyof typeof ACTIVITY_STATUS
  createdAt: string
  updatedAt: string
  assignedTo?: string
  completedAt?: string
  notes?: string[]
  attachments?: string[]
}

export type NewMaintenanceRequest = Omit<
  MaintenanceRequest,
  "id" | "status" | "createdAt" | "updatedAt" | "assignedTo" | "completedAt" | "notes" | "attachments"
>

export type UpdateMaintenanceRequest = Partial<MaintenanceRequest> & { id: string }
