import WelcomeTemplate from '@/emails/welcome'
import { ratelimit } from '../../../lib/ratelimit'
import { render } from '@react-email/render'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import process from 'process'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
    request: NextRequest
): Promise<NextResponse> {
    // Get the client's IP address from headers (x-forwarded-for may contain a comma-separated list)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor
        ? forwardedFor.split(',')[0].trim()
        : '127.0.0.1'

    const result = await ratelimit.limit(ip)

    if (!result.success) {
        return NextResponse.json(
            { error: 'Too many requests!!' },
            { status: 429 }
        )
    }

    const { email, firstname }: { email: string; firstname: string } =
        await request.json()
    const { data, error }: { data: any; error: any } =
        await resend.emails.send({
            from: 'Richard Hudson<rhudsontspr@gmail.com>',
            to: [email],
            subject:
                'Thank you for waitlisting the Hudson Digital Solutions - Property Management System!',
            replyTo: 'rhudsontspr@gmail.com',
            html: await render(
                WelcomeTemplate({
                    position: firstname,
                    referralCode: ''
                })
            )
        })

    if (error) {
        return NextResponse.json(error)
    }

    return NextResponse.json({ success: true, data })
}
