-- Drop maintenance-related tables
DROP TABLE IF EXISTS public.maintenance_costs CASCADE;
DROP TABLE IF EXISTS public.maintenance_inventory CASCADE;
DROP TABLE IF EXISTS public.maintenance_requests CASCADE;
DROP TABLE IF EXISTS public.maintenance_schedule CASCADE;
DROP TABLE IF EXISTS public.maintenance_team CASCADE;
DROP TABLE IF EXISTS public.maintenance_templates CASCADE;

-- Drop maintenance-related enums
DROP TYPE IF EXISTS public.maintenancecategory CASCADE;
DROP TYPE IF EXISTS public.maintenancepriority CASCADE;
DROP TYPE IF EXISTS public.maintenancestatus CASCADE;
