'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface SubscribeData {
  email: string;
  tier?: 'starter' | 'professional' | 'enterprise';
}

interface ContactFormData {
  email: string;
  name: string;
  message: string;
  company?: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function subscribeToWaitlist(data: SubscribeData) {
  try {
    // Validate email
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        error: 'Please enter a valid email address',
      };
    }

    // TODO: Integrate with your email service provider
    // For now, we'll simulate a successful subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store subscription preferences in cookies
    (
      await // Store subscription preferences in cookies
      cookies()
    ).set({
      name: 'subscribed',
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      error: 'Failed to subscribe. Please try again later.',
    };
  }
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate form data
    if (!data.email || !data.name || !data.message) {
      return {
        error: 'Please fill in all required fields',
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        error: 'Please enter a valid email address',
      };
    }

    // TODO: Integrate with your email service or CRM
    // For now, we'll simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath('/contact');
    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      error: 'Failed to submit form. Please try again later.',
    };
  }
}

export async function requestDemo(data: ContactFormData) {
  try {
    // Validate form data
    if (!data.email || !data.name || !data.company) {
      return {
        error: 'Please fill in all required fields',
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        error: 'Please enter a valid email address',
      };
    }

    // TODO: Integrate with your scheduling system
    // For now, we'll simulate a successful demo request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath('/demo');
    return {
      success: true,
      message:
        'Thank you for your interest! Our team will contact you shortly to schedule your demo.',
    };
  } catch (error) {
    console.error('Demo request error:', error);
    return {
      error: 'Failed to request demo. Please try again later.',
    };
  }
}

export async function startFreeTrial(data: SubscribeData) {
  try {
    if (!data.email || !data.tier) {
      return {
        error: 'Please provide both email and selected tier',
      };
    }

    // TODO: Integrate with your payment/subscription system
    // For now, redirect to a thank you page
    (
      await // TODO: Integrate with your payment/subscription system
      // For now, redirect to a thank you page
      cookies()
    ).set({
      name: 'trial_tier',
      value: data.tier,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    redirect('/thank-you');
  } catch (error) {
    console.error('Free trial error:', error);
    return {
      error: 'Failed to start free trial. Please try again later.',
    };
  }
}

export async function signInWithEmail(formData: FormData) {
  const credentials = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  try {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    return error ? { error: error.message } : { success: true };
  } catch (error) {
    return { error: 'Authentication failed' };
  }
}

export async function signUpWithEmail(formData: FormData) {
  const credentials = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  try {
    const { data, error } = await supabase.auth.signUp(credentials);
    return error ? { error: error.message } : { success: true };
  } catch (error) {
    return { error: 'Registration failed' };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return error ? { error: error.message } : { success: true };
  } catch (error) {
    return { error: 'Logout failed' };
  }
}

export async function getSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    return null;
  }
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  if (!email) return { error: 'Email is required' };

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
    return error ? { error: error.message } : { success: true };
  } catch (error) {
    return { error: 'Password reset failed. Please try again.' };
  }
}
