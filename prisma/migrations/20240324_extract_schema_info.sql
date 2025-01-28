-- Get table and column information
SELECT
    c.table_schema,
    c.table_name,
    c.column_name,
    c.data_type,
    c.is_nullable,
    c.column_default,
    tc.constraint_name,
    tc.constraint_type,
    ccu.table_name as foreign_table,
    ccu.column_name as foreign_column
FROM information_schema.columns c
LEFT JOIN information_schema.table_constraints tc
    ON tc.table_schema = c.table_schema
    AND tc.table_name = c.table_name
LEFT JOIN information_schema.constraint_column_usage ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE c.table_schema IN ('public', 'auth')
ORDER BY
    c.table_schema,
    c.table_name,
    c.ordinal_position;
