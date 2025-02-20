export type MaintenanceRequestWithRelations = {
    id: string
    created_at: string
    property_id: string
    tenant_id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'open' | 'in_progress' | 'completed' | 'cancelled'
    assigned_to?: string
    completed_at?: string
    updated_at?: string
}

export interface UpdateMaintenanceRequest {
    id: string
    created_at: Date
    property_id: string
    tenant_id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'open' | 'in_progress' | 'completed' | 'cancelled'
    assigned_to?: string
    updated_at?: Date
}

export interface MaintenanceTicketDetailsProps {
    open: boolean
    onOpenChangeAction: (open: boolean) => void
    ticket: MaintenanceRequestWithRelations
    onUpdateAction: (data: UpdateMaintenanceRequest) => Promise<void>
    onAddCommentAction: (comment: Comment) => Promise<void>
}

export interface MaintenanceRequest {
    id: string
    created_at: string
    unit_id: string
    tenant_id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'open' | 'in_progress' | 'completed' | 'cancelled'
    assigned_to?: string
    completed_at?: string
    property_id?: string
    updated_at?: string
}
