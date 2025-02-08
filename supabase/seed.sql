-- Seed data for testing
INSERT INTO public.users (id, name, email, image, subscription_status, created_at, updated_at)
VALUES (
  uuid_generate_v4(),
  'Test Owner',
  'owner@example.com',
  'https://example.com/avatar.jpg',
  'active',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Create a test property
WITH user_id AS (
  SELECT id FROM public.users WHERE email = 'owner@example.com' LIMIT 1
)
INSERT INTO public.properties (
  id, name, address, city, state, zip, property_type, rent_amount,
  user_id, property_status, created_at, updated_at
)
SELECT
  uuid_generate_v4(),
  'Test Property',
  '3604 Steven Drive',
  'Plano',
  'Texas',
  '75023',
  'Residential',
  2800,
  user_id.id,
  'active',
  NOW(),
  NOW()
FROM user_id
RETURNING id;

-- Create a test tenant
WITH property_data AS (
  SELECT id FROM public.properties WHERE address = '3604 Steven Drive' LIMIT 1
),
user_data AS (
  SELECT id FROM public.users WHERE email = 'owner@example.com' LIMIT 1
)
INSERT INTO public.tenants (
  id, property_id, user_id, first_name, last_name, email, phone,
  tenant_status, move_in_date, emergency_contact, documents,
  created_at, updated_at
)
SELECT
  uuid_generate_v4(),
  property_data.id,
  user_data.id,
  'Alicia',
  'Douglass',
  'alicia@loishouseinplano.com',
  '972-208-2863',
  'active',
  NOW(),
  '{"name": "Lois Greer", "phone": "214-316-2911", "relationship": "Mother"}'::jsonb,
  '[]'::jsonb,
  NOW(),
  NOW()
FROM property_data, user_data;

-- Create initial waitlist entries for testing
INSERT INTO public.waitlist (
  id, email, name, position, status, referral_code,
  email_verified, created_at, updated_at
)
VALUES
  (
    uuid_generate_v4(),
    'test1@example.com',
    'Test User 1',
    1,
    'PENDING',
    encode(gen_random_bytes(8), 'hex'),
    false,
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'test2@example.com',
    'Test User 2',
    2,
    'PENDING',
    encode(gen_random_bytes(8), 'hex'),
    false,
    NOW(),
    NOW()
  );
