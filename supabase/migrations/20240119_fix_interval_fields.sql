-- Convert interval fields to text representation
ALTER TABLE public.maintenance_schedule
    ALTER COLUMN frequency TYPE text;

ALTER TABLE public.maintenance_templates
    ALTER COLUMN estimated_duration TYPE text;

-- Add check constraints to ensure valid format
ALTER TABLE public.maintenance_schedule
    ADD CONSTRAINT valid_frequency_format
    CHECK (frequency ~ '^(\d+\s+(days|weeks|months|years)|\d{2}:\d{2}:\d{2})$');

ALTER TABLE public.maintenance_templates
    ADD CONSTRAINT valid_duration_format
    CHECK (estimated_duration ~ '^(\d+\s+(days|weeks|months|years)|\d{2}:\d{2}:\d{2})$');

-- Update existing records to a default format
UPDATE public.maintenance_schedule
SET frequency = '30 days'
WHERE frequency IS NOT NULL;

UPDATE public.maintenance_templates
SET estimated_duration = '02:00:00'
WHERE estimated_duration IS NOT NULL;
