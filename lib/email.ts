// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const emailService = {
 async sendWelcome(email: string) {
   return resend.emails.send({
     from: 'welcome@yourapp.com',
     to: email,
     subject: 'Welcome to the Property Pro Waitlist!',
     react: WelcomeEmail({ email })
   })
 }
}

// components/emails/welcome.tsx
import { EmailTemplate } from '@/components/emails/template'

export default function WelcomeEmail({ email }: { email: string }) {
 return (
   <EmailTemplate>
     <h1>Welcome to Property Pro!</h1>
     <p>Thanks for joining our waitlist.</p>
     <p>We'll notify you when early access is available.</p>
   </EmailTemplate>
 )
}

// Update API route
export async function POST(req: Request) {
 try {
   const { email } = await req.json()
   const entry = await waitlistDB.add(email)
   await emailService.sendWelcome(email)
   return Response.json(entry)
 } catch (error) {
   console.error('Waitlist error:', error)
   return Response.json({ error: 'Failed to join' }, { status: 500 })
 }
}
