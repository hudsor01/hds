'use server'

import { EmailTemplate } from '../../../components//email/email-template'
import { Resend } from 'resend'
import type * as React from 'react'
import process from 'process'

const resend = new Resend({ apiKey: process.env.RESEND_API_KEY })

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Hudson Digital Solutions <info@hudsondigitalsolutions.com>',
            to: ['delivered@hudsondigitalsolutions.com'],
            subject: 'Hello world',
            react: EmailTemplate({
                firstName: 'John'
            }) as React.ReactElement
        })

        if (error) {
            return Response.json({ error }, { status: 500 })
        }

        return Response.json({ data })
    } catch (error) {
        return Response.json({ error }, { status: 500 })
    }
}
