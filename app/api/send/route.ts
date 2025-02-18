'use server'

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { to, subject, templateData } = json

    const { data, error } = await resend.emails.send({
      from: 'HDS Platform <notifications@hdsplatform.com>',
      to,
      subject,
      react: await EmailTemplate(templateData)
    })

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
