-- Function to calculate monthly revenue for a property
CREATE OR REPLACE FUNCTION calculate_property_revenue(
    p_property_id UUID,
    p_start_date DATE,
    p_end_date DATE
) RETURNS TABLE (
    month DATE,
    expected_revenue NUMERIC,
    actual_revenue NUMERIC,
    occupancy_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE months AS (
        SELECT DATE_TRUNC('month', p_start_date)::DATE AS month
        UNION ALL
        SELECT (month + INTERVAL '1 month')::DATE
        FROM months
        WHERE month < DATE_TRUNC('month', p_end_date)::DATE
    ),
    unit_revenues AS (
        SELECT
            DATE_TRUNC('month', l.start_date)::DATE as month,
            SUM(l.rent_amount) as potential_revenue,
            COUNT(u.id) as occupied_units,
            COUNT(u.id) FILTER (WHERE l.status = 'active') as active_units
        FROM units u
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.start_date <= p_end_date
            AND l.end_date >= p_start_date
        WHERE u.property_id = p_property_id
        GROUP BY DATE_TRUNC('month', l.start_date)::DATE
    )
    SELECT
        m.month,
        COALESCE(ur.potential_revenue, 0) as expected_revenue,
        COALESCE(ur.potential_revenue * (ur.active_units::NUMERIC / NULLIF(ur.occupied_units, 0)), 0) as actual_revenue,
        CASE
            WHEN ur.occupied_units > 0 THEN
                ROUND((ur.active_units::NUMERIC / ur.occupied_units::NUMERIC) * 100, 2)
            ELSE 0
        END as occupancy_rate
    FROM months m
    LEFT JOIN unit_revenues ur ON m.month = ur.month
    ORDER BY m.month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate lease financial summary
CREATE OR REPLACE FUNCTION calculate_lease_financials(
    p_lease_id UUID
) RETURNS TABLE (
    total_rent_due NUMERIC,
    total_rent_paid NUMERIC,
    security_deposit NUMERIC,
    outstanding_balance NUMERIC,
    lease_duration_months INTEGER
) AS $$
BEGIN
    RETURN QUERY
    WITH lease_details AS (
        SELECT
            l.*,
            EXTRACT(MONTH FROM AGE(l.end_date, l.start_date)) +
            EXTRACT(YEAR FROM AGE(l.end_date, l.start_date)) * 12 as months
        FROM leases l
        WHERE l.id = p_lease_id
    )
    SELECT
        (ld.months * ld.rent_amount) as total_rent_due,
        0 as total_rent_paid, -- Placeholder for future payment tracking
        ld.security_deposit,
        (ld.months * ld.rent_amount) as outstanding_balance, -- Placeholder calculation
        ld.months::INTEGER as lease_duration_months
    FROM lease_details ld;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate property financial report
CREATE OR REPLACE FUNCTION generate_property_financial_report(
    p_property_id UUID,
    p_year INTEGER,
    p_month INTEGER
) RETURNS TABLE (
    metric_name TEXT,
    metric_value NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH monthly_data AS (
        SELECT
            COUNT(DISTINCT u.id) as total_units,
            COUNT(DISTINCT CASE WHEN u.status = 'occupied' THEN u.id END) as occupied_units,
            SUM(CASE WHEN l.status = 'active' THEN l.rent_amount ELSE 0 END) as monthly_revenue,
            SUM(l.security_deposit) as total_deposits
        FROM properties p
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.start_date <= make_date(p_year, p_month, 1)
            AND l.end_date >= make_date(p_year, p_month, 1)
        WHERE p.id = p_property_id
    )
    SELECT 'Total Units'::TEXT, total_units::NUMERIC
    FROM monthly_data
    UNION ALL
    SELECT 'Occupied Units'::TEXT, occupied_units::NUMERIC
    FROM monthly_data
    UNION ALL
    SELECT 'Occupancy Rate'::TEXT,
        CASE
            WHEN total_units > 0 THEN
                ROUND((occupied_units::NUMERIC / total_units::NUMERIC) * 100, 2)
            ELSE 0
        END
    FROM monthly_data
    UNION ALL
    SELECT 'Monthly Revenue'::TEXT, COALESCE(monthly_revenue, 0)
    FROM monthly_data
    UNION ALL
    SELECT 'Total Security Deposits'::TEXT, COALESCE(total_deposits, 0)
    FROM monthly_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate property portfolio metrics
CREATE OR REPLACE FUNCTION calculate_portfolio_metrics(
    p_organization_id UUID
) RETURNS TABLE (
    total_properties INTEGER,
    total_units INTEGER,
    total_occupied_units INTEGER,
    portfolio_occupancy_rate NUMERIC,
    total_monthly_revenue NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH portfolio_data AS (
        SELECT
            COUNT(DISTINCT p.id) as properties,
            COUNT(DISTINCT u.id) as units,
            COUNT(DISTINCT CASE WHEN u.status = 'occupied' THEN u.id END) as occupied_units,
            SUM(CASE WHEN l.status = 'active' THEN l.rent_amount ELSE 0 END) as monthly_revenue
        FROM properties p
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.status = 'active'
        WHERE p.organization_id = p_organization_id
    )
    SELECT
        properties,
        units,
        occupied_units,
        CASE
            WHEN units > 0 THEN
                ROUND((occupied_units::NUMERIC / units::NUMERIC) * 100, 2)
            ELSE 0
        END,
        COALESCE(monthly_revenue, 0)
    FROM portfolio_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate year-over-year growth
CREATE OR REPLACE FUNCTION calculate_yoy_growth(
    p_organization_id UUID,
    p_year INTEGER
) RETURNS TABLE (
    metric_name TEXT,
    current_year_value NUMERIC,
    previous_year_value NUMERIC,
    growth_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH yearly_data AS (
        SELECT
            y.year,
            COUNT(DISTINCT p.id) as total_properties,
            COUNT(DISTINCT u.id) as total_units,
            SUM(CASE WHEN l.status = 'active' THEN l.rent_amount * 12 ELSE 0 END) as annual_revenue
        FROM generate_series(p_year-1, p_year) y(year)
        LEFT JOIN properties p ON p.organization_id = p_organization_id
            AND EXTRACT(YEAR FROM p.created_at) <= y.year
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND EXTRACT(YEAR FROM l.start_date) <= y.year
            AND (EXTRACT(YEAR FROM l.end_date) >= y.year OR l.end_date IS NULL)
        GROUP BY y.year
    )
    SELECT
        metric_name,
        current_value,
        previous_value,
        CASE
            WHEN previous_value > 0 THEN
                ROUND(((current_value - previous_value) / previous_value * 100), 2)
            ELSE 0
        END as growth
    FROM (
        SELECT
            'Properties'::TEXT as metric_name,
            MAX(CASE WHEN year = p_year THEN total_properties END) as current_value,
            MAX(CASE WHEN year = p_year-1 THEN total_properties END) as previous_value
        FROM yearly_data
        UNION ALL
        SELECT
            'Units'::TEXT,
            MAX(CASE WHEN year = p_year THEN total_units END),
            MAX(CASE WHEN year = p_year-1 THEN total_units END)
        FROM yearly_data
        UNION ALL
        SELECT
            'Annual Revenue'::TEXT,
            MAX(CASE WHEN year = p_year THEN annual_revenue END),
            MAX(CASE WHEN year = p_year-1 THEN annual_revenue END)
        FROM yearly_data
    ) metrics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
