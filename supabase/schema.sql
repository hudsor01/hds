-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table (extended user information)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    company_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users ON DELETE CASCADE,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    beds INTEGER NOT NULL,
    baths NUMERIC(3,1) NOT NULL,
    sqft INTEGER NOT NULL,
    lot_size NUMERIC(10,2),
    year_built INTEGER,
    property_type TEXT NOT NULL,
    status TEXT DEFAULT 'available',
    rent_amount NUMERIC(10,2),
    deposit_amount NUMERIC(10,2),
    available_date DATE,
    description TEXT,
    amenities TEXT[],
    features TEXT[],
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenants table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES properties ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    ssn TEXT,
    date_of_birth DATE,
    current_employer TEXT,
    annual_income NUMERIC(10,2),
    move_in_date DATE,
    lease_end_date DATE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leases table
CREATE TABLE IF NOT EXISTS leases (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES properties ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rent_amount NUMERIC(10,2) NOT NULL,
    deposit_amount NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'active',
    lease_type TEXT DEFAULT 'standard',
    payment_day INTEGER NOT NULL,
    late_fee_amount NUMERIC(10,2),
    documents TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES properties ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'pending',
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lease_id UUID REFERENCES leases ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    payment_type TEXT NOT NULL,
    payment_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status TEXT DEFAULT 'pending',
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for properties
CREATE POLICY "Users can view own properties" ON properties
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create properties" ON properties
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own properties" ON properties
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own properties" ON properties
    FOR DELETE USING (auth.uid() = owner_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS properties_owner_id_idx ON properties(owner_id);
CREATE INDEX IF NOT EXISTS tenants_property_id_idx ON tenants(property_id);
CREATE INDEX IF NOT EXISTS leases_property_id_idx ON leases(property_id);
CREATE INDEX IF NOT EXISTS leases_tenant_id_idx ON leases(tenant_id);
CREATE INDEX IF NOT EXISTS maintenance_property_id_idx ON maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS payments_lease_id_idx ON payments(lease_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
