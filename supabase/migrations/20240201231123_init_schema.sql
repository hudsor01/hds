-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create enum types
CREATE TYPE "property_status" AS ENUM (
  'available',
  'occupied',
  'maintenance',
  'renovation',
  'off_market'
);

CREATE TYPE "payment_status" AS ENUM (
  'Pending',
  'Paid',
  'Overdue',
  'Cancelled'
);

CREATE TYPE "payment_method" AS ENUM (
  'CREDIT_CARD',
  'BANK_TRANSFER',
  'CASH',
  'CHECK'
);

-- Create properties table
CREATE TABLE "properties" (
  "id" UUID DEFAULT gen_random_uuid PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "zip" TEXT NOT NULL,
  "owner_id" UUID NOT NULL,
  "manager_id" UUID,
  "status" property_status DEFAULT 'available',
  "type" TEXT DEFAULT 'Residential',
  "rent_amount" DECIMAL(10,2) NOT NULL,
  "amenities" TEXT[] DEFAULT '{}',
  "images" TEXT[] DEFAULT '{}',
  "bathrooms" INTEGER,
  "bedrooms" INTEGER,
  "size" INTEGER,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Create maintenance_requests table
CREATE TABLE "maintenance_requests" (
  "id" UUID DEFAULT gen_random_uuid PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "status" TEXT DEFAULT 'PENDING',
  "priority" TEXT DEFAULT 'MEDIUM',
  "property_id" UUID REFERENCES properties(id),
  "requester_id" UUID NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE "payments" (
  "user_id" UUID NOT NULL,
  "lease_id" TEXT NOT NULL,
  "tenant_id" TEXT NOT NULL,
  "property_id" UUID REFERENCES properties(id),
  "amount" DECIMAL(10,2) NOT NULL,
  "due_date" TIMESTAMPTZ NOT NULL,
  "paid_date" TIMESTAMPTZ,
  "status" payment_status DEFAULT 'Pending',
  "method" payment_method,
  "reference" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

-- Create indexes
CREATE INDEX idx_properties_owner ON properties(owner_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_maintenance_property ON maintenance_requests(property_id);
CREATE INDEX idx_maintenance_requester ON maintenance_requests(requester_id);
CREATE INDEX idx_payments_property ON payments(property_id);
CREATE INDEX idx_payments_tenant ON payments(tenant_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own properties"
  ON properties FOR SELECT
  USING (owner_id = auth.uid());

CREATE POLICY "Users can insert their own properties"
  ON properties FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update their own properties"
  ON properties FOR UPDATE
  USING (owner_id = auth.uid());

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at
    BEFORE UPDATE ON maintenance_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
