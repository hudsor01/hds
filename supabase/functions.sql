-- Function to create a new lease and update unit status
CREATE OR REPLACE FUNCTION create_lease(
    p_unit_id UUID,
    p_tenant_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_rent_amount NUMERIC,
    p_security_deposit NUMERIC
) RETURNS TABLE (
    lease_id UUID,
    status TEXT
) AS $$
DECLARE
    v_unit_status VARCHAR;
    v_lease_id UUID;
BEGIN
    -- Check if unit exists and get its status
    SELECT status INTO v_unit_status
    FROM units
    WHERE id = p_unit_id;

    IF v_unit_status != 'vacant' THEN
        RETURN QUERY SELECT NULL::UUID, 'Unit is not vacant'::TEXT;
        RETURN;
    END IF;

    -- Begin transaction
    BEGIN
        -- Create new lease
        INSERT INTO leases (
            unit_id,
            tenant_id,
            start_date,
            end_date,
            rent_amount,
            security_deposit,
            status
        ) VALUES (
            p_unit_id,
            p_tenant_id,
            p_start_date,
            p_end_date,
            p_rent_amount,
            p_security_deposit,
            CASE
                WHEN p_start_date <= CURRENT_DATE THEN 'active'
                ELSE 'pending'
            END
        ) RETURNING id INTO v_lease_id;

        -- Update unit status
        UPDATE units
        SET status = 'occupied'
        WHERE id = p_unit_id;

        -- Update tenant status
        UPDATE tenants
        SET status = 'active'
        WHERE id = p_tenant_id;

        RETURN QUERY SELECT v_lease_id, 'Success'::TEXT;
    EXCEPTION WHEN OTHERS THEN
        RETURN QUERY SELECT NULL::UUID, SQLERRM::TEXT;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to renew a lease
CREATE OR REPLACE FUNCTION renew_lease(
    p_lease_id UUID,
    p_new_end_date DATE,
    p_new_rent_amount NUMERIC DEFAULT NULL
) RETURNS TEXT AS $$
DECLARE
    v_old_lease leases%ROWTYPE;
BEGIN
    -- Get current lease details
    SELECT * INTO v_old_lease
    FROM leases
    WHERE id = p_lease_id;

    IF NOT FOUND THEN
        RETURN 'Lease not found';
    END IF;

    IF v_old_lease.status != 'active' THEN
        RETURN 'Only active leases can be renewed';
    END IF;

    -- Create new lease record
    INSERT INTO leases (
        unit_id,
        tenant_id,
        start_date,
        end_date,
        rent_amount,
        security_deposit,
        status
    ) VALUES (
        v_old_lease.unit_id,
        v_old_lease.tenant_id,
        v_old_lease.end_date + 1,
        p_new_end_date,
        COALESCE(p_new_rent_amount, v_old_lease.rent_amount),
        v_old_lease.security_deposit,
        'pending'
    );

    -- Update old lease status
    UPDATE leases
    SET status = 'expired'
    WHERE id = p_lease_id;

    RETURN 'Success';
EXCEPTION WHEN OTHERS THEN
    RETURN SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle maintenance request status updates
CREATE OR REPLACE FUNCTION update_maintenance_request(
    p_request_id UUID,
    p_new_status VARCHAR,
    p_assigned_to UUID DEFAULT NULL
) RETURNS TEXT AS $$
DECLARE
    v_request maintenance_requests%ROWTYPE;
    v_unit_id UUID;
BEGIN
    -- Get current request details
    SELECT * INTO v_request
    FROM maintenance_requests
    WHERE id = p_request_id;

    IF NOT FOUND THEN
        RETURN 'Maintenance request not found';
    END IF;

    -- Begin transaction
    BEGIN
        -- Update request status
        UPDATE maintenance_requests
        SET
            status = p_new_status,
            assigned_to = COALESCE(p_assigned_to, assigned_to),
            completed_at = CASE
                WHEN p_new_status = 'completed' THEN CURRENT_TIMESTAMP
                ELSE completed_at
            END
        WHERE id = p_request_id;

        -- If completed, check if unit needs status update
        IF p_new_status = 'completed' THEN
            SELECT unit_id INTO v_unit_id
            FROM maintenance_requests
            WHERE id = p_request_id;

            UPDATE units
            SET status = 'vacant'
            WHERE id = v_unit_id
            AND status = 'maintenance';
        END IF;

        RETURN 'Success';
    EXCEPTION WHEN OTHERS THEN
        RETURN SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and update lease statuses
CREATE OR REPLACE FUNCTION update_lease_statuses() RETURNS INTEGER AS $$
DECLARE
    v_updated INTEGER := 0;
BEGIN
    -- Update expired leases
    UPDATE leases
    SET status = 'expired'
    WHERE status = 'active'
    AND end_date < CURRENT_DATE;

    GET DIAGNOSTICS v_updated = ROW_COUNT;

    -- Update pending leases
    UPDATE leases
    SET status = 'active'
    WHERE status = 'pending'
    AND start_date <= CURRENT_DATE;

    GET DIAGNOSTICS v_updated = v_updated + ROW_COUNT;

    RETURN v_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate occupancy rate for a property
CREATE OR REPLACE FUNCTION calculate_property_occupancy(p_property_id UUID)
RETURNS TABLE (
    total_units INTEGER,
    occupied_units INTEGER,
    occupancy_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH unit_counts AS (
        SELECT
            COUNT(*) as total,
            COUNT(CASE WHEN status = 'occupied' THEN 1 END) as occupied
        FROM units
        WHERE property_id = p_property_id
    )
    SELECT
        total::INTEGER,
        occupied::INTEGER,
        CASE
            WHEN total > 0 THEN ROUND((occupied::NUMERIC / total::NUMERIC) * 100, 2)
            ELSE 0
        END
    FROM unit_counts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get tenant lease history
CREATE OR REPLACE FUNCTION get_tenant_lease_history(p_tenant_id UUID)
RETURNS TABLE (
    lease_id UUID,
    property_name VARCHAR,
    unit_number VARCHAR,
    start_date DATE,
    end_date DATE,
    rent_amount NUMERIC,
    status VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        l.id,
        p.name,
        u.unit_number,
        l.start_date,
        l.end_date,
        l.rent_amount,
        l.status
    FROM leases l
    JOIN units u ON l.unit_id = u.id
    JOIN properties p ON u.property_id = p.id
    WHERE l.tenant_id = p_tenant_id
    ORDER BY l.start_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger function to automatically update unit status when maintenance is requested
CREATE OR REPLACE FUNCTION maintenance_request_status_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.priority = 'urgent' THEN
        UPDATE units
        SET status = 'maintenance'
        WHERE id = NEW.unit_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER maintenance_request_status_update
    AFTER INSERT ON maintenance_requests
    FOR EACH ROW
    EXECUTE FUNCTION maintenance_request_status_trigger();
