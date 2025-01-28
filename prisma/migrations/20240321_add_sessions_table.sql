-- Create sessions table for NextAuth.js
CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "sessions_session_token_key" UNIQUE ("session_token"),
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("userId")
        REFERENCES "public"."users" ("id") ON DELETE CASCADE
);

-- Create index for faster session lookups
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "public"."sessions" ("user_id");

-- Add missing fields to accounts table if they don't exist
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "refresh_token" TEXT;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "access_token" TEXT;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "expires_at" INTEGER;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "token_type" TEXT;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "scope" TEXT;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "id_token" TEXT;
ALTER TABLE "public"."accounts" ADD COLUMN IF NOT EXISTS "session_state" TEXT;
