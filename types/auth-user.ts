export interface AuthUserMetadata {
  name?: string | null
}

export interface AuthAppMetadata {
  // Add app-specific metadata fields here
  [key: string]: any
}

export interface AuthUser {
  id: string
  email: string
  encrypted_password?: string | null
  email_confirmed_at?: Date | null
  last_sign_in_at?: Date | null
  raw_app_meta_data?: AuthAppMetadata | null
  raw_user_meta_data?: AuthUserMetadata | null
  created_at: Date
  updated_at: Date
  phone?: string | null
  phone_confirmed_at?: Date | null
  confirmation_sent_at?: Date | null
  recovery_sent_at?: Date | null
  reauthentication_sent_at?: Date | null
  is_sso_user: boolean
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  subscription_status?: string | null
  trial_ends_at?: Date | null
  role?: string | null
}
