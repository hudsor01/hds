-- Create expenses table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    paid_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT valid_category CHECK (category IN (
        'maintenance',
        'utilities',
        'insurance',
        'property_tax',
        'mortgage',
        'management_fee',
        'repairs',
        'marketing',
        'other'
    )),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'paid', 'cancelled'))
);

-- Create index for better query performance
CREATE INDEX idx_expenses_property ON expenses(property_id);
CREATE INDEX idx_expenses_unit ON expenses(unit_id);
CREATE INDEX idx_expenses_date ON expenses(date);

-- Enable RLS
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for organization members" ON expenses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM properties p
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE p.id = expenses.property_id
            AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Enable write access for organization admins" ON expenses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM properties p
            JOIN organization_members om ON p.organization_id = om.organization_id
            WHERE p.id = expenses.property_id
            AND om.user_id = auth.uid()
            AND om.role IN ('owner', 'admin')
        )
    );

-- Function to calculate property expenses
CREATE OR REPLACE FUNCTION calculate_property_expenses(
    p_property_id UUID,
    p_start_date DATE,
    p_end_date DATE
) RETURNS TABLE (
    category TEXT,
    total_amount NUMERIC,
    paid_amount NUMERIC,
    pending_amount NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.category::TEXT,
        SUM(e.amount) as total_amount,
        SUM(CASE WHEN e.status = 'paid' THEN e.amount ELSE 0 END) as paid_amount,
        SUM(CASE WHEN e.status = 'pending' THEN e.amount ELSE 0 END) as pending_amount
    FROM expenses e
    WHERE e.property_id = p_property_id
    AND e.date BETWEEN p_start_date AND p_end_date
    AND e.status != 'cancelled'
    GROUP BY e.category
    ORDER BY total_amount DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate profit and loss
CREATE OR REPLACE FUNCTION calculate_profit_loss(
    p_property_id UUID,
    p_year INTEGER,
    p_month INTEGER
) RETURNS TABLE (
    revenue NUMERIC,
    expenses NUMERIC,
    net_income NUMERIC,
    expense_breakdown JSON
) AS $$
DECLARE
    v_start_date DATE;
    v_end_date DATE;
BEGIN
    -- Set date range for the specified month
    v_start_date := make_date(p_year, p_month, 1);
    v_end_date := v_start_date + INTERVAL '1 month' - INTERVAL '1 day';

    RETURN QUERY
    WITH monthly_revenue AS (
        SELECT COALESCE(SUM(l.rent_amount), 0) as total_revenue
        FROM leases l
        JOIN units u ON l.unit_id = u.id
        WHERE u.property_id = p_property_id
        AND l.status = 'active'
        AND l.start_date <= v_end_date
        AND l.end_date >= v_start_date
    ),
    monthly_expenses AS (
        SELECT
            COALESCE(SUM(e.amount), 0) as total_expenses,
            jsonb_object_agg(
                e.category,
                SUM(e.amount)
            ) as expenses_by_category
        FROM expenses e
        WHERE e.property_id = p_property_id
        AND e.date BETWEEN v_start_date AND v_end_date
        AND e.status != 'cancelled'
    )
    SELECT
        r.total_revenue,
        e.total_expenses,
        (r.total_revenue - e.total_expenses) as net_income,
        e.expenses_by_category::JSON
    FROM monthly_revenue r
    CROSS JOIN monthly_expenses e;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate expense metrics
CREATE OR REPLACE FUNCTION calculate_expense_metrics(
    p_property_id UUID,
    p_start_date DATE DEFAULT NULL,
    p_end_date DATE DEFAULT NULL
) RETURNS TABLE (
    metric_name TEXT,
    metric_value NUMERIC
) AS $$
BEGIN
    -- Set default date range to current year if not provided
    p_start_date := COALESCE(p_start_date, date_trunc('year', current_date)::DATE);
    p_end_date := COALESCE(p_end_date, current_date);

    RETURN QUERY
    WITH expense_data AS (
        SELECT
            SUM(e.amount) as total_expenses,
            COUNT(*) as expense_count,
            COUNT(*) FILTER (WHERE e.status = 'pending') as pending_count,
            SUM(e.amount) FILTER (WHERE e.category = 'maintenance') as maintenance_expenses,
            AVG(e.amount) as avg_expense_amount
        FROM expenses e
        WHERE e.property_id = p_property_id
        AND e.date BETWEEN p_start_date AND p_end_date
        AND e.status != 'cancelled'
    )
    SELECT 'Total Expenses'::TEXT, total_expenses
    FROM expense_data
    UNION ALL
    SELECT 'Average Expense Amount'::TEXT, ROUND(avg_expense_amount, 2)
    FROM expense_data
    UNION ALL
    SELECT 'Pending Expenses Count'::TEXT, pending_count::NUMERIC
    FROM expense_data
    UNION ALL
    SELECT 'Maintenance Expense Ratio'::TEXT,
        CASE
            WHEN total_expenses > 0 THEN
                ROUND((maintenance_expenses / total_expenses * 100), 2)
            ELSE 0
        END
    FROM expense_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
