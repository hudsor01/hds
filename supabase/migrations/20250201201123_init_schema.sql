-- CreateEnum
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'paymenttype')
CREATE TYPE "public"."paymenttype" AS ENUM ('Rent', 'Deposit', 'Maintenance', 'Other');

-- CreateEnum
ALTER TYPE "public"."property_status"  ENUM ('available', 'occupied', 'maintenance', 'renovation', 'off_market');

-- CreateEnum
CREATE TYPE "public"."property_type" AS ENUM ('single_family', 'multi_family', 'apartment', 'condo', 'townhouse', 'commercial', 'industrial', 'land');

-- CreateEnum
CREATE TYPE "public"."propertystatus" AS ENUM ('Occupied', 'Vacant', 'Maintenance');

-- CreateEnum
CREATE TYPE "public"."propertytype" AS ENUM ('Residential', 'Commercial', 'Industrial');

-- CreateEnum
CREATE TYPE "public"."request_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripe_customer_id" TEXT,
    "subscription_status" TEXT,
    "properties" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "tenancies" JSONB[] DEFAULT ARRAY[]::JSONB[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tenants" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "unit_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "move_in_date" DATE,
    "move_out_date" DATE,
    "emergency_contact" JSONB DEFAULT '{}',
    "documents" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Documents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" BIGINT,
    "propertyId" UUID,
    "leaseId" UUID,
    "uploadedBy" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "variables" JSONB,
    "is_active" BOOLEAN DEFAULT true,
    "created_by" UUID,
    "updated_by" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expenses" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "property_id" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT,
    "date" DATE NOT NULL,
    "receipt_url" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ip_blacklist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ip_address" INET NOT NULL,
    "reason" TEXT NOT NULL,
    "added_by" UUID,
    "expires_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ip_blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."leases" (
    "user_id" UUID NOT NULL DEFAULT auth.uid(),
    "tenant_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "type" "public"."LeaseType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "rent_amount" DECIMAL(65,30) NOT NULL,
    "depositAmount" DECIMAL(65,30) NOT NULL,
    "payment_day" INTEGER NOT NULL,
    "documents" TEXT[],
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT DEFAULT 'Pending',

    CONSTRAINT "leases_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."login_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "success" BOOLEAN DEFAULT true,
    "failure_reason" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maintenance_requests" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT DEFAULT 'PENDING',
    "priority" TEXT DEFAULT 'MEDIUM',
    "property_id" UUID,
    "requester_id" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."message_threads" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "subject" TEXT NOT NULL,
    "last_message_id" UUID,
    "participants" UUID[],
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sender_id" UUID NOT NULL,
    "recipient_id" UUID NOT NULL,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "read_at" TIMESTAMPTZ(6),
    "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "parent_id" UUID,
    "thread_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "type" "public"."notification_type" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB DEFAULT '{}',
    "read_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organizations" (
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."password_reset_requests" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "used_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "user_id" UUID NOT NULL DEFAULT auth.uid(),
    "lease_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "paid_date" TIMESTAMP(3),
    "status" "public"."paymentstatus" NOT NULL DEFAULT 'Pending',
    "method" "public"."PaymentMethod",
    "reference" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "user_id" UUID NOT NULL DEFAULT auth.uid(),
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,
    "manager_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL DEFAULT 'Residential',
    "rent_amount" DECIMAL(10,2) NOT NULL,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bathrooms" INTEGER,
    "bedrooms" INTEGER,
    "size" INTEGER,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rent_payments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "property_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "due_date" DATE NOT NULL,
    "paid_date" DATE,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payment_method" TEXT,
    "invoice_number" TEXT,
    "transaction_id" TEXT,
    "late_fee" DECIMAL(10,2) DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rent_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."security_audit_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "event_type" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "resource_id" TEXT,
    "ip_address" INET,
    "user_agent" TEXT,
    "old_values" JSONB,
    "new_values" JSONB,
    "metadata" JSONB,
    "severity" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "product_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "active_until" TIMESTAMPTZ(6),

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_configurations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" VARCHAR(255) NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "updated_by" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."units" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "property_id" UUID NOT NULL,
    "unit_number" TEXT NOT NULL,
    "floor_plan" TEXT,
    "square_feet" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" DECIMAL(3,1),
    "rent_amount" DECIMAL(10,2),
    "status" TEXT NOT NULL DEFAULT 'vacant',
    "features" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_activity_logs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" UUID,
    "details" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "avatar_url" TEXT,
    "company_name" TEXT,
    "company_position" TEXT,
    "timezone" TEXT DEFAULT 'UTC',
    "notification_preferences" JSONB DEFAULT '{}',
    "last_login_at" TIMESTAMPTZ(6),
    "last_login_ip" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_security_settings" (
    "user_id" UUID NOT NULL,
    "two_factor_enabled" BOOLEAN DEFAULT false,
    "two_factor_method" TEXT,
    "backup_codes" TEXT[],
    "allowed_ips" INET[],
    "max_sessions" INTEGER DEFAULT 5,
    "password_expires_at" TIMESTAMPTZ(6),
    "require_password_change" BOOLEAN DEFAULT false,
    "last_password_change" TIMESTAMPTZ(6),
    "security_questions" JSONB,
    "login_notifications" BOOLEAN DEFAULT true,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_security_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."user_settings" (
    "id" UUID NOT NULL,
    "theme" TEXT DEFAULT 'light',
    "language" TEXT DEFAULT 'en',
    "currency" TEXT DEFAULT 'USD',
    "date_format" TEXT DEFAULT 'MM/DD/YYYY',
    "time_format" TEXT DEFAULT '12h',
    "notifications_enabled" BOOLEAN DEFAULT true,
    "email_notifications" BOOLEAN DEFAULT true,
    "sms_notifications" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."waitlist_attempts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "identifier" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "waitlist_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."schema_migrations" (
    "version" VARCHAR(14) NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "email_confirmed_at" TIMESTAMPTZ(6),
    "invited_at" TIMESTAMPTZ(6),
    "confirmation_token" TEXT,
    "confirmation_sent_at" TIMESTAMPTZ(6),
    "recovery_token" TEXT,
    "recovery_sent_at" TIMESTAMPTZ(6),
    "email_change_token" TEXT,
    "email_change" TEXT,
    "email_change_sent_at" TIMESTAMPTZ(6),
    "last_sign_in_at" TIMESTAMPTZ(6),
    "raw_app_meta_data" JSONB,
    "raw_user_meta_data" JSONB,
    "is_super_admin" BOOLEAN,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "phone" TEXT,
    "phone_confirmed_at" TIMESTAMPTZ(6),
    "phone_change" TEXT DEFAULT '',
    "phone_change_token" TEXT DEFAULT '',
    "phone_change_sent_at" TIMESTAMPTZ(6),
    "confirmed_at" TIMESTAMPTZ(6),
    "email_change_confirm_status" SMALLINT DEFAULT 0,
    "banned_until" TIMESTAMPTZ(6),
    "reauthentication_token" TEXT DEFAULT '',
    "reauthentication_sent_at" TIMESTAMPTZ(6),
    "is_sso_user" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMPTZ(6),
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "subscription_status" TEXT DEFAULT 'inactive',
    "trial_ends_at" TIMESTAMPTZ(6),
    "provider" TEXT,
    "provider_account_id" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_at" INTEGER,
    "email_verified" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "public"."organization_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    "organization_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role" TEXT DEFAULT '''member''',
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "userId" UUID NOT NULL DEFAULT auth.uid(),
    "type" "public"."ActivityType" NOT NULL,
    "entityType" "public"."EntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminAuditLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "entityType" "public"."entity_type" NOT NULL,
    "entityId" UUID,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "tenants_status_idx" ON "public"."tenants"("status");

-- CreateIndex
CREATE INDEX "tenants_unit_id_idx" ON "public"."tenants"("unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "expenses_category_idx" ON "public"."expenses"("category");

-- CreateIndex
CREATE INDEX "expenses_property_id_idx" ON "public"."expenses"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "ip_blacklist_ip_address_key" ON "public"."ip_blacklist"("ip_address");

-- CreateIndex
CREATE INDEX "ip_blacklist_expires_idx" ON "public"."ip_blacklist"("expires_at");

-- CreateIndex
CREATE INDEX "ip_blacklist_ip_idx" ON "public"."ip_blacklist"("ip_address");

-- CreateIndex
CREATE INDEX "leases_created_at_idx" ON "public"."leases"("created_at");

-- CreateIndex
CREATE INDEX "leases_end_date_idx" ON "public"."leases"("end_date");

-- CreateIndex
CREATE INDEX "leases_propertyId_idx" ON "public"."leases"("property_id");

-- CreateIndex
CREATE INDEX "leases_start_date_idx" ON "public"."leases"("start_date");

-- CreateIndex
CREATE INDEX "leases_tenantId_idx" ON "public"."leases"("tenant_id");

-- CreateIndex
CREATE INDEX "leases_tenant_id_idx" ON "public"."leases"("tenant_id");

-- CreateIndex
CREATE INDEX "leases_type_idx" ON "public"."leases"("type");

-- CreateIndex
CREATE INDEX "leases_user_id_idx" ON "public"."leases"("user_id");

-- CreateIndex
CREATE INDEX "message_threads_created_at_idx" ON "public"."message_threads"("created_at");

-- CreateIndex
CREATE INDEX "message_threads_participants_idx" ON "public"."message_threads" USING GIN ("participants");

-- CreateIndex
CREATE INDEX "messages_created_at_idx" ON "public"."messages"("created_at");

-- CreateIndex
CREATE INDEX "messages_recipient_id_idx" ON "public"."messages"("recipient_id");

-- CreateIndex
CREATE INDEX "messages_sender_id_idx" ON "public"."messages"("sender_id");

-- CreateIndex
CREATE INDEX "messages_thread_id_idx" ON "public"."messages"("thread_id");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "public"."notifications"("created_at");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "public"."notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "public"."notifications"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_key" ON "public"."organizations"("user_id");

-- CreateIndex
CREATE INDEX "password_reset_expires_at_idx" ON "public"."password_reset_requests"("expires_at");

-- CreateIndex
CREATE INDEX "password_reset_token_idx" ON "public"."password_reset_requests"("token");

-- CreateIndex
CREATE INDEX "payments_created_at_idx" ON "public"."payments"("created_at");

-- CreateIndex
CREATE INDEX "payments_due_date_idx" ON "public"."payments"("due_date");

-- CreateIndex
CREATE INDEX "payments_leaseId_idx" ON "public"."payments"("lease_id");

-- CreateIndex
CREATE INDEX "payments_propertyId_idx" ON "public"."payments"("property_id");

-- CreateIndex
CREATE INDEX "payments_property_id_idx" ON "public"."payments"("property_id");

-- CreateIndex
CREATE INDEX "payments_status_created_at_idx" ON "public"."payments"("status", "created_at");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "public"."payments"("status");

-- CreateIndex
CREATE INDEX "payments_tenantId_idx" ON "public"."payments"("tenant_id");

-- CreateIndex
CREATE INDEX "payments_tenant_id_idx" ON "public"."payments"("tenant_id");

-- CreateIndex
CREATE INDEX "payments_user_id_idx" ON "public"."payments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "public"."profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE INDEX "properties_owner_id_idx" ON "public"."properties"("owner_id");

-- CreateIndex
CREATE INDEX "rent_payments_due_date_idx" ON "public"."rent_payments"("due_date");

-- CreateIndex
CREATE INDEX "rent_payments_property_id_idx" ON "public"."rent_payments"("property_id");

-- CreateIndex
CREATE INDEX "rent_payments_tenant_id_idx" ON "public"."rent_payments"("tenant_id");

-- CreateIndex
CREATE INDEX "security_audit_created_at_idx" ON "public"."security_audit_log"("created_at");

-- CreateIndex
CREATE INDEX "security_audit_event_type_idx" ON "public"."security_audit_log"("event_type");

-- CreateIndex
CREATE INDEX "security_audit_resource_idx" ON "public"."security_audit_log"("resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "security_audit_user_id_idx" ON "public"."security_audit_log"("user_id");

-- CreateIndex
CREATE INDEX "subscriptions_active_until_idx" ON "public"."subscriptions"("active_until");

-- CreateIndex
CREATE INDEX "subscriptions_product_id_idx" ON "public"."subscriptions"("product_id");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "public"."subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "public"."subscriptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_user_id_product_id_key" ON "public"."subscriptions"("user_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_configurations_key_key" ON "public"."system_configurations"("key");

-- CreateIndex
CREATE INDEX "units_property_id_idx" ON "public"."units"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "units_property_id_unit_number_key" ON "public"."units"("property_id", "unit_number");

-- CreateIndex
CREATE INDEX "user_activity_logs_action_idx" ON "public"."user_activity_logs"("action");

-- CreateIndex
CREATE INDEX "user_activity_logs_created_at_idx" ON "public"."user_activity_logs"("created_at");

-- CreateIndex
CREATE INDEX "user_activity_logs_user_id_idx" ON "public"."user_activity_logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_email_key" ON "public"."user_profiles"("email");

-- CreateIndex
CREATE INDEX "user_profiles_email_idx" ON "public"."user_profiles"("email");

-- CreateIndex
CREATE INDEX "idx_waitlist_attempts_created_at" ON "public"."waitlist_attempts"("created_at");

-- CreateIndex
CREATE INDEX "idx_waitlist_attempts_identifier" ON "public"."waitlist_attempts"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "schema_migrations_version_idx" ON "auth"."schema_migrations"("version");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "auth"."users"("stripe_customer_id");

-- CreateIndex
CREATE INDEX "idx_users_email_verified" ON "auth"."users"("email_verified");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "auth"."users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx_auth" ON "auth"."users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "auth"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_provider_account_unique" ON "auth"."users"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_members_organization_id_key" ON "public"."organization_members"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_members_user_id_key" ON "public"."organization_members"("user_id");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "public"."Activity"("type");

-- AddForeignKey
ALTER TABLE "public"."maintenance_requests" ADD CONSTRAINT "MaintenanceRequest_property_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."maintenance_requests" ADD CONSTRAINT "MaintenanceRequest_user_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
