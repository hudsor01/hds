-- Drop task-related tables
DROP TABLE IF EXISTS public.task_comments CASCADE;
DROP TABLE IF EXISTS public.task_time_logs CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.time_entries CASCADE;
DROP TABLE IF EXISTS public.sprints CASCADE;

-- Drop task-related enums
DROP TYPE IF EXISTS public.taskstatus CASCADE;
DROP TYPE IF EXISTS public.taskpriority CASCADE;
DROP TYPE IF EXISTS public.task_status CASCADE;
DROP TYPE IF EXISTS public.task_priority CASCADE;
DROP TYPE IF EXISTS public.project_status CASCADE;
DROP TYPE IF EXISTS public.project_visibility CASCADE;
DROP TYPE IF EXISTS public.projectstatus CASCADE;
