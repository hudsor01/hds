import { supabase } from '@/lib/supabase';
import dotenv from 'dotenv';
import path from 'path';
import { beforeAll } from 'vitest';

// Load test environment variables
const envPath = path.resolve(process.cwd(), '.env.test');
dotenv.config({ path: envPath });

// Set environment variables for Supabase
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

beforeAll(async () => {
  try {
    // Sign in with test credentials
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'test-password',
    });

    if (signInError) {
      // If sign in fails, try to create a test user
      const { error: signUpError } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'test-password',
      });

      if (signUpError) {
        console.error('Error creating test user:', signUpError);
        throw signUpError;
      }
    }

    // Verify we're authenticated
    const { data: { user }, error: getCurrentUserError } = await supabase.auth.getCurrentUser();

    if (getCurrentUserError) {
      console.error('Error getting user:', getCurrentUserError);
      throw getCurrentUserError;
    }

    if (!user) {
      console.warn('No authenticated user found. Some tests may fail.');
    } else {
      console.log('Test user authenticated:', user.id);
    }
  } catch (error) {
    console.error('Error in test setup:', error);
    throw error;
  }
});
