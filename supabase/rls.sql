-- Create organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    name VARCHAR(255) NOT NULL,
    subscription_status VARCHAR(50) NOT NULL DEFAULT 'active'
);

-- Create organization members table
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'member',
    CONSTRAINT valid_role CHECK (role IN ('owner', 'admin', 'member', 'readonly')),
    UNIQUE(organization_id, user_id)
);

-- Add organization_id to existing tables
ALTER TABLE properties ADD COLUMN organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE;
ALTER TABLE tenants ADD COLUMN organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE;

-- Create indexes for organization relationships
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_properties_org ON properties(organization_id);
CREATE INDEX idx_tenants_org ON tenants(organization_id);

-- Helper function to get user's organizations
CREATE OR REPLACE FUNCTION get_user_organizations(user_id UUID)
RETURNS TABLE (organization_id UUID, role VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT om.organization_id, om.role
    FROM organization_members om
    WHERE om.user_id = get_user_organizations.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has required role
CREATE OR REPLACE FUNCTION has_organization_role(org_id UUID, required_roles VARCHAR[])
RETURNS BOOLEAN AS $$
DECLARE
    user_role VARCHAR;
BEGIN
    SELECT role INTO user_role
    FROM organization_members
    WHERE organization_id = org_id
    AND user_id = auth.uid();

    RETURN user_role = ANY(required_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing basic policies
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON units;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON tenants;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON leases;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON maintenance_requests;

-- Properties policies
CREATE POLICY "Enable read access for organization members" ON properties
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = properties.organization_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization admins" ON properties
    FOR ALL USING (
        has_organization_role(organization_id, ARRAY['owner', 'admin'])
    );

-- Units policies
CREATE POLICY "Enable read access for organization members" ON units
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM properties p
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE p.id = units.property_id
            AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization admins" ON units
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM properties p
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE p.id = units.property_id
            AND om.user_id = auth.uid()
            AND om.role IN ('owner', 'admin')
        )
    );

-- Tenants policies
CREATE POLICY "Enable read access for organization members" ON tenants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = tenants.organization_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization admins" ON tenants
    FOR ALL USING (
        has_organization_role(organization_id, ARRAY['owner', 'admin'])
    );

-- Leases policies
CREATE POLICY "Enable read access for organization members" ON leases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM units u
            JOIN properties p ON u.property_id = p.id
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE u.id = leases.unit_id
            AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization admins" ON leases
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM units u
            JOIN properties p ON u.property_id = p.id
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE u.id = leases.unit_id
            AND om.user_id = auth.uid()
            AND om.role IN ('owner', 'admin')
        )
    );

-- Maintenance requests policies
CREATE POLICY "Enable read access for organization members" ON maintenance_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM units u
            JOIN properties p ON u.property_id = p.id
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE u.id = maintenance_requests.unit_id
            AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization members" ON maintenance_requests
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM units u
            JOIN properties p ON u.property_id = p.id
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE u.id = maintenance_requests.unit_id
            AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable update access for organization admins" ON maintenance_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM units u
            JOIN properties p ON u.property_id = p.id
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE u.id = maintenance_requests.unit_id
            AND om.user_id = auth.uid()
            AND om.role IN ('owner', 'admin')
        )
    );

-- Enable RLS on new tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Organization policies
CREATE POLICY "Enable read access for organization members" ON organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = organizations.id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization owners" ON organizations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = organizations.id
            AND user_id = auth.uid()
            AND role = 'owner'
        )
    );

-- Organization members policies
CREATE POLICY "Enable read access for organization members" ON organization_members
    FOR SELECT USING (
        organization_id IN (
            SELECT om.organization_id
            FROM organization_members om
            WHERE om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable management for organization owners" ON organization_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_id = organization_members.organization_id
            AND user_id = auth.uid()
            AND role = 'owner'
        )
    );
