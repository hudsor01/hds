import { Resend } from 'resend'
import process from 'process'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
    to: string
    subject: string
    text: string
    html: string
}

export async function sendEmail({
    to,
    subject,
    text,
    html
}: SendEmailParams): Promise<{
    success: boolean
    data?: unknown
    error?: unknown
}> {
    try {
        const result = await resend.emails.send({
            from: 'HDS Waitlist <waitlist@hudsondigitalsolutions.com>',
            to,
            subject,
            text,
            html
        })
        return { success: true, data: result }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
    }
}
