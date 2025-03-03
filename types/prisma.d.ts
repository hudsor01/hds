export {}

declare global {
    namespace PrismaJson {
        // Property-related JSON types
        type PropertyJson = {
            id: string
            name: string
            address: string
            city: string
            state: string
            zip: string
            type: string
            status: string
            rent_amount: number
            amenities: string[]
            images: string[]
            bathrooms?: number
            bedrooms?: number
            size?: number
            features?: Record<string, unknown>
            metadata?: Record<string, unknown>
            organization_id: string
            created_at: string
            updated_at: string
            deleted_at?: string
            tenant_id: string
            lease_id: string
            maintenance_id: string
            payment_id: string
            invoice_id: string
            event_id: string
            document_id: string
            organization: {
                id: string
                name: string
                address: string
                city: string
                state: string
                zip: string
                phone: string
                email: string
                website: string
                created_at: string
                updated_at: string
            }
            tenant: {
                id: string
                first_name: string
                last_name: string
                email: string
                phone?: string
                status: string
                emergency_contact?: {
                    name: string
                    phone: string
                    relationship: string
                    email?: string
                    address?: string
                }
                documents?: Array<{
                    type: string
                    url: string
                    name: string
                    uploaded_at: string
                }>
                metadata?: Record<string, unknown>
            }
            lease: {
                id: string
                property_id: string
                tenant_id: string
                type: string
                status: string
                start_date: string
                end_date?: string
                rent_amount: number
                deposit_amount: number
                payment_day: number
                terms?: Record<string, unknown>
                documents?: Array<{
                    type: string
                    url: string
                    name: string
                    uploaded_at: string
                }>
                metadata?: Record<string, unknown>
            }
            maintenance: {
                id: string
                property_id: string
                tenant_id?: string
                title: string
                description: string
                status: string
                priority: string
                category?: string
                assigned_to?: string
                images?: string[]
                cost?: number
                scheduled_date?: string
                completed_date?: string
                notes?: string[]
                metadata?: Record<string, unknown>
            }
            payment: {
                id: string
                tenant_id: string
                amount: number
                status: string
                type: string
                date: string
                method?: string
                reference?: string
                metadata?: Record<string, unknown>
            }
            invoice: {
                id: string
                tenant_id: string
                amount: number
                status: string
                type: string
                date: string
                due_date?: string
                payment_status?: string
                payment_method?: string
                payment_date?: string
                metadata?: Record<string, unknown>
            }
            event: {
                id: string
                title: string
                description: string
                start_date: string
                end_date?: string
                location?: string
                status: string
                type: string
                category?: string
                images?: string[]
                cost?: number
                metadata?: Record<string, unknown>
            }
            document: {
                id: string
                name: string
                type: string
                url: string
                uploaded_at: string
            }
        }

        /**
         * Tenant-related JSON types
         */
        type TenantJson = {
            id: string
            first_name: string
            last_name: string
            email: string
            phone?: string
            status: string
            emergency_contact?: {
                name: string
                phone: string
                relationship: string
                email?: string
                address?: string
            }
            documents?: Array<{
                type: string
                url: string
                name: string
                uploaded_at: string
            }>
            metadata?: Record<string, unknown>
        }

        // Lease-related JSON types
        type LeaseJson = {
            id: string
            property_id: string
            tenant_id: string
            type: string
            status: string
            start_date: string
            end_date?: string
            rent_amount: number
            deposit_amount: number
            payment_day: number
            terms?: Record<string, unknown>
            documents?: Array<{
                type: string
                url: string
                name: string
                uploaded_at: string
            }>
            metadata?: Record<string, unknown>
        }

        // Payment-related JSON types
        type PaymentJson = {
            id: string
            tenant_id: string
            amount: number
            status: string
            type: string
            date: string
            method?: string
            reference?: string
            metadata?: Record<string, unknown>
        }

        // Maintenance-related JSON types
        type MaintenanceJson = {
            id: string
            property_id: string
            tenant_id?: string
            title: string
            description: string
            status: string
            priority: string
            category?: string
            assigned_to?: string
            images?: string[]
            cost?: number
            scheduled_date?: string
            completed_date?: string
            notes?: string[]
            metadata?: Record<string, unknown>
        }

        // User preferences and settings
        type UserPreferencesJson = {
            theme?: 'light' | 'dark' | 'system'
            notifications?: {
                email?: boolean
                sms?: boolean
                push?: boolean
                types?: string[]
            }
            dashboard?: {
                layout?: string
                widgets?: string[]
                favorites?: string[]
            }
            locale?: string
            timezone?: string
            currency?: string
            dateFormat?: string
            metadata?: Record<string, unknown>
        }
    }
}
