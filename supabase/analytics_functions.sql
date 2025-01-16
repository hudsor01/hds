-- Function to calculate property ROI metrics
CREATE OR REPLACE FUNCTION calculate_property_roi(
    p_property_id UUID,
    p_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER
) RETURNS TABLE (
    metric_name TEXT,
    metric_value NUMERIC,
    calculation_notes TEXT
) AS $$
DECLARE
    v_start_date DATE;
    v_end_date DATE;
    v_total_revenue NUMERIC;
    v_total_expenses NUMERIC;
    v_property_value NUMERIC;
BEGIN
    -- Set date range for the year
    v_start_date := make_date(p_year, 1, 1);
    v_end_date := make_date(p_year, 12, 31);

    -- Calculate total revenue (rent + other income)
    SELECT COALESCE(SUM(l.rent_amount *
        LEAST(
            EXTRACT(DAYS FROM LEAST(l.end_date, v_end_date) - GREATEST(l.start_date, v_start_date)) + 1,
            EXTRACT(DAYS FROM v_end_date - v_start_date) + 1
        ) / 30.0), 0)
    INTO v_total_revenue
    FROM leases l
    JOIN units u ON l.unit_id = u.id
    WHERE u.property_id = p_property_id
    AND l.status = 'active'
    AND l.start_date <= v_end_date
    AND l.end_date >= v_start_date;

    -- Calculate total expenses
    SELECT COALESCE(SUM(e.amount), 0)
    INTO v_total_expenses
    FROM expenses e
    WHERE e.property_id = p_property_id
    AND e.date BETWEEN v_start_date AND v_end_date
    AND e.status != 'cancelled';

    -- For this example, we'll use the sum of unit rent amounts * 12 * 10 as a simple property value estimate
    -- In a real application, this should come from a property_valuations table or similar
    SELECT COALESCE(SUM(rent_amount) * 12 * 10, 0)
    INTO v_property_value
    FROM units
    WHERE property_id = p_property_id;

    RETURN QUERY
    -- Cash on Cash Return
    SELECT
        'Cash on Cash Return'::TEXT,
        CASE
            WHEN v_property_value > 0 THEN
                ROUND(((v_total_revenue - v_total_expenses) / v_property_value * 100), 2)
            ELSE 0
        END,
        'Annual net operating income / Property value'::TEXT
    UNION ALL
    -- Capitalization Rate
    SELECT
        'Cap Rate'::TEXT,
        CASE
            WHEN v_property_value > 0 THEN
                ROUND(((v_total_revenue - v_total_expenses) / v_property_value * 100), 2)
            ELSE 0
        END,
        'Net operating income / Property value'::TEXT
    UNION ALL
    -- Gross Rent Multiplier
    SELECT
        'Gross Rent Multiplier'::TEXT,
        CASE
            WHEN v_total_revenue > 0 THEN
                ROUND((v_property_value / v_total_revenue), 2)
            ELSE 0
        END,
        'Property value / Gross annual rental income'::TEXT
    UNION ALL
    -- Operating Expense Ratio
    SELECT
        'Operating Expense Ratio'::TEXT,
        CASE
            WHEN v_total_revenue > 0 THEN
                ROUND((v_total_expenses / v_total_revenue * 100), 2)
            ELSE 0
        END,
        'Total operating expenses / Gross operating income'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate portfolio investment metrics
CREATE OR REPLACE FUNCTION calculate_portfolio_investment_metrics(
    p_organization_id UUID,
    p_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER
) RETURNS TABLE (
    property_id UUID,
    property_name TEXT,
    total_revenue NUMERIC,
    total_expenses NUMERIC,
    net_operating_income NUMERIC,
    roi_percentage NUMERIC,
    occupancy_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH property_metrics AS (
        -- Calculate revenue and expenses for each property
        SELECT
            p.id as pid,
            p.name,
            -- Revenue calculation
            COALESCE(SUM(l.rent_amount *
                EXTRACT(MONTH FROM
                    LEAST(l.end_date, make_date(p_year, 12, 31)) -
                    GREATEST(l.start_date, make_date(p_year, 1, 1))
                ) + 1), 0) as revenue,
            -- Expenses calculation
            COALESCE((
                SELECT SUM(e.amount)
                FROM expenses e
                WHERE e.property_id = p.id
                AND EXTRACT(YEAR FROM e.date) = p_year
                AND e.status != 'cancelled'
            ), 0) as expenses,
            -- Occupancy calculation
            COALESCE(
                AVG(
                    CASE
                        WHEN u.status = 'occupied' THEN 1.0
                        ELSE 0.0
                    END
                ) * 100, 0) as avg_occupancy
        FROM properties p
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.status = 'active'
            AND EXTRACT(YEAR FROM l.start_date) <= p_year
            AND EXTRACT(YEAR FROM l.end_date) >= p_year
        WHERE p.organization_id = p_organization_id
        GROUP BY p.id, p.name
    )
    SELECT
        pid,
        name,
        revenue,
        expenses,
        (revenue - expenses) as noi,
        CASE
            WHEN revenue > 0 THEN
                ROUND(((revenue - expenses) / revenue * 100), 2)
            ELSE 0
        END as roi,
        ROUND(avg_occupancy, 2)
    FROM property_metrics
    ORDER BY noi DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate investment performance report
CREATE OR REPLACE FUNCTION generate_investment_performance_report(
    p_organization_id UUID,
    p_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER
) RETURNS TABLE (
    metric_name TEXT,
    current_value NUMERIC,
    previous_value NUMERIC,
    yoy_change NUMERIC,
    notes TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH current_year AS (
        SELECT
            COUNT(DISTINCT p.id) as property_count,
            COUNT(DISTINCT u.id) as unit_count,
            COALESCE(SUM(l.rent_amount), 0) as total_revenue,
            COALESCE(SUM(e.amount), 0) as total_expenses,
            COALESCE(AVG(CASE WHEN u.status = 'occupied' THEN 1.0 ELSE 0.0 END) * 100, 0) as occupancy_rate
        FROM properties p
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.status = 'active'
            AND EXTRACT(YEAR FROM l.start_date) = p_year
        LEFT JOIN expenses e ON p.id = e.property_id
            AND EXTRACT(YEAR FROM e.date) = p_year
            AND e.status != 'cancelled'
        WHERE p.organization_id = p_organization_id
    ),
    previous_year AS (
        SELECT
            COUNT(DISTINCT p.id) as property_count,
            COUNT(DISTINCT u.id) as unit_count,
            COALESCE(SUM(l.rent_amount), 0) as total_revenue,
            COALESCE(SUM(e.amount), 0) as total_expenses,
            COALESCE(AVG(CASE WHEN u.status = 'occupied' THEN 1.0 ELSE 0.0 END) * 100, 0) as occupancy_rate
        FROM properties p
        LEFT JOIN units u ON p.id = u.property_id
        LEFT JOIN leases l ON u.id = l.unit_id
            AND l.status = 'active'
            AND EXTRACT(YEAR FROM l.start_date) = p_year - 1
        LEFT JOIN expenses e ON p.id = e.property_id
            AND EXTRACT(YEAR FROM e.date) = p_year - 1
            AND e.status != 'cancelled'
        WHERE p.organization_id = p_organization_id
    )
    SELECT
        metric_name,
        current_val,
        prev_val,
        CASE
            WHEN prev_val > 0 THEN
                ROUND(((current_val - prev_val) / prev_val * 100), 2)
            ELSE NULL
        END,
        notes
    FROM (
        VALUES
            ('Total Properties'::TEXT,
             (SELECT property_count FROM current_year),
             (SELECT property_count FROM previous_year),
             'Number of properties in portfolio'::TEXT),
            ('Total Revenue'::TEXT,
             (SELECT total_revenue FROM current_year),
             (SELECT total_revenue FROM previous_year),
             'Gross rental income'::TEXT),
            ('Total Expenses'::TEXT,
             (SELECT total_expenses FROM current_year),
             (SELECT total_expenses FROM previous_year),
             'Operating and maintenance costs'::TEXT),
            ('Net Operating Income'::TEXT,
             (SELECT total_revenue - total_expenses FROM current_year),
             (SELECT total_revenue - total_expenses FROM previous_year),
             'Revenue minus expenses'::TEXT),
            ('Average Occupancy Rate'::TEXT,
             (SELECT ROUND(occupancy_rate, 2) FROM current_year),
             (SELECT ROUND(occupancy_rate, 2) FROM previous_year),
             'Percentage of occupied units'::TEXT)
    ) as metrics(metric_name, current_val, prev_val, notes);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
