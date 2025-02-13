import WelcomeEmail from '@/components/emails/welcome'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailService = {
  async sendWelcome(email: string) {
    return resend.emails.send({
      from: 'info@hudsondigitalsolutions.com',
      to: email,
      subject: 'Welcome to the Hudson Digital Property Management Waitlist!',
      react: WelcomeEmail({ email })
    })
  }
}
