-- Add missing fields and relations for authentication
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "password_hash" TEXT;
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "provider" TEXT;
ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "provider_id" TEXT;

-- Create index for provider authentication
CREATE INDEX IF NOT EXISTS "users_provider_provider_id_idx" ON "public"."users" ("provider", "provider_id");

-- Ensure accounts table exists with proper relations
CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id")
        REFERENCES "public"."users" ("id") ON DELETE CASCADE,
    CONSTRAINT "accounts_provider_provider_account_id_key" UNIQUE ("provider", "provider_account_id")
);

-- Create index for faster account lookups
CREATE INDEX IF NOT EXISTS "accounts_user_id_idx" ON "public"."accounts" ("user_id");
