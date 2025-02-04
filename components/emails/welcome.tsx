// components/emails/welcome.tsx
import {EmailTemplate} from '@/components/emails/template';

export default function WelcomeEmail({email}: {email: string}) {
  return (
    <EmailTemplate>
      <h1>Welcome to Property Pro!</h1>
      <p>Thank you for joining our waitlist.</p>
      <p>We will notify you when early access is available.</p>
    </EmailTemplate>
  );
}

// Update API route
export async function POST(req: Request) {
  try {
    const {email} = await req.json();
    const entry = await waitlistDB.add(email);
    await emailService.sendWelcome(email);
    return Response.json(entry);
  } catch (error) {
    console.error('Waitlist error:', error);
    return Response.json({error: 'Failed to join'}, {status: 500});
  }
}
