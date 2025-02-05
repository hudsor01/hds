import WelcomeTemplate from '../../../emails';
import {ratelimit} from '@/lib/ratelimit';
import {render} from '@react-email/render';
import {NextRequest, NextResponse} from 'next/server';
import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return NextResponse.json({error: 'Too many requests!!'}, {status: 429});
  }

  const {email, firstname} = await request.json();
  const {data, error} = await resend.emails.send({
    from: 'Richard Hudson<rhudsontspr@gmail.com>',
    to: [email],
    subject: 'Thankyou for waitlisting the Hudson Digital Solutions - Property Management System!',
    replyTo: 'rhudsontspr@gmail.com',
    html: await render(WelcomeTemplate({userFirstname: firstname})),
  });

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json({success: true, data});
}
