import '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface UserMetadata {
    avatar_url?: string;
    full_name?: string;
    name?: string;
    user_name?: string;
    organization_id?: string;
    role?: 'admin' | 'user' | 'owner';
  }
}

// Extend the User type to include our custom fields
declare module '@supabase/gotrue-js' {
  interface User {
    app_metadata: {
      provider?: string;
      [key: string]: any;
    };
    user_metadata: UserMetadata;
    aud: string;
    created_at: string;
    confirmed_at?: string;
    email?: string;
    email_confirmed_at?: string;
    phone?: string;
    last_sign_in_at?: string;
    role?: string;
  }
}
