import VerificationEmail from '@/emails/verification';
import { resend } from '@/lib/email';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';

export class WaitlistVerificationService {
  private static VERIFICATION_TOKEN_LENGTH = 32;
  private static VERIFICATION_EXPIRY_HOURS = 24;

  /**
   * Generate a verification token
   */
  private static async generateVerificationToken(): Promise<string> {
    return nanoid(this.VERIFICATION_TOKEN_LENGTH);
  }

  /**
   * Send verification email
   */
  static async sendVerificationEmail(email: string): Promise<boolean> {
    try {
      // Generate verification token
      const token = await this.generateVerificationToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + this.VERIFICATION_EXPIRY_HOURS);

      // Store verification token
      const {error} = await supabase.from('verification_tokens').insert([
        {
          identifier: email,
          token,
          expires: expiresAt.toISOString(),
        },
      ]);

      if (error) throw error;

      // Send verification email
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

      await resend.emails.send({
        from: 'Property Manager <waitlist@hudsondigitalsolutions.com>',
        to: email,
        subject: 'Verify your email address',
        react: VerificationEmail({
          verificationUrl,
          expiresIn: `${this.VERIFICATION_EXPIRY_HOURS} hours`,
        }),
      });

      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<{
    success: boolean;
    email?: string;
    error?: string;
  }> {
    try {
      // Get verification token
      const {data: verification, error} = await supabase
        .from('verification_tokens')
        .select('*')
        .eq('token', token)
        .single();

      if (error || !verification) {
        return {success: false, error: 'Invalid verification token'};
      }

      // Check if token is expired
      if (new Date(verification.expires) < new Date()) {
        return {success: false, error: 'Verification token has expired'};
      }

      // Update waitlist entry
      const {error: updateError} = await supabase
        .from('waitlist')
        .update({
          status: 'active',
          email_verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('email', verification.identifier);

      if (updateError) {
        return {success: false, error: 'Failed to verify email'};
      }

      // Delete used token
      await supabase.from('verification_tokens').delete().eq('token', token);

      // Track verification event
      await supabase.from('waitlist_events').insert([
        {
          email: verification.identifier,
          type: 'email_verified',
          metadata: {
            verified_at: new Date().toISOString(),
          },
        },
      ]);

      return {success: true, email: verification.identifier};
    } catch (error) {
      console.error('Error verifying email:', error);
      return {success: false, error: 'Failed to verify email'};
    }
  }

  /**
   * Check verification status
   */
  static async checkVerificationStatus(email: string): Promise<{
    isVerified: boolean;
    verifiedAt?: string;
  }> {
    const {data, error} = await supabase
      .from('waitlist')
      .select('email_verified, verified_at')
      .eq('email', email)
      .single();

    if (error || !data) {
      return {isVerified: false};
    }

    return {
      isVerified: data.email_verified || false,
      verifiedAt: data.verified_at,
    };
  }

  /**
   * Resend verification email
   */
  static async resendVerification(email: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Check if already verified
      const {isVerified} = await this.checkVerificationStatus(email);
      if (isVerified) {
        return {success: false, error: 'Email is already verified'};
      }

      // Delete any existing tokens
      await supabase.from('verification_tokens').delete().eq('identifier', email);

      // Send new verification email
      const success = await this.sendVerificationEmail(email);
      return {success};
    } catch (error) {
      console.error('Error resending verification:', error);
      return {success: false, error: 'Failed to resend verification email'};
    }
  }
}
