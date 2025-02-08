import { sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/utils/token'
import { WaitlistStatus } from '@prisma/client'

export class WaitlistVerificationService {
  static async sendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const waitlistEntry = await prisma.waitlist.findUnique({
        where: { email },
      })

      if (!waitlistEntry) {
        return { success: false, error: 'Email not found in waitlist' }
      }

      if (waitlistEntry.status === WaitlistStatus.VERIFIED) {
        return { success: false, error: 'Email already verified' }
      }

      const token = generateToken()
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      await prisma.waitlistVerification.create({
        data: {
          email,
          token,
          expiresAt,
        },
      })

      await sendEmail({
        to: email,
        subject: 'Verify your waitlist position',
        text: `Click the following link to verify your email: ${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`,
        html: `
          <h1>Verify your waitlist position</h1>
          <p>Click the following link to verify your email:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}">
            Verify Email
          </a>
          <p>This link will expire in 24 hours.</p>
        `,
      })

      return { success: true }
    } catch (error) {
      console.error('Error sending verification email:', error)
      return { success: false, error: 'Failed to send verification email' }
    }
  }

  static async verifyEmail(token: string): Promise<{ success: boolean; email?: string; error?: string }> {
    try {
      const verification = await prisma.waitlistVerification.findUnique({
        where: { token },
      })

      if (!verification) {
        return { success: false, error: 'Invalid verification token' }
      }

      if (verification.expiresAt < new Date()) {
        return { success: false, error: 'Verification token has expired' }
      }

      const waitlistEntry = await prisma.waitlist.findUnique({
        where: { email: verification.email },
      })

      if (!waitlistEntry) {
        return { success: false, error: 'Email not found in waitlist' }
      }

      await prisma.waitlist.update({
        where: { email: verification.email },
        data: { status: WaitlistStatus.VERIFIED },
      })

      // Clean up used verification token
      await prisma.waitlistVerification.delete({
        where: { token },
      })

      return { success: true, email: verification.email }
    } catch (error) {
      console.error('Error verifying email:', error)
      return { success: false, error: 'Failed to verify email' }
    }
  }

  static async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const waitlistEntry = await prisma.waitlist.findUnique({
        where: { email },
      })

      if (!waitlistEntry) {
        return { success: false, error: 'Email not found in waitlist' }
      }

      if (waitlistEntry.status === WaitlistStatus.VERIFIED) {
        return { success: false, error: 'Email already verified' }
      }

      // Delete any existing verification tokens for this email
      await prisma.waitlistVerification.deleteMany({
        where: { email },
      })

      // Send new verification email
      return this.sendVerificationEmail(email)
    } catch (error) {
      console.error('Error resending verification:', error)
      return { success: false, error: 'Failed to resend verification' }
    }
  }
}
