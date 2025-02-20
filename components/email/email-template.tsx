'use client'

import * as React from 'react'
import type { EmailTemplateProps } from '@/types/emails'

export const EmailTemplate: React.FC<
    Readonly<EmailTemplateProps>
> = ({ firstName, lastName, subject, body, sender, recipient }) => (
    <div>
        <h1>
            Welcome, {firstName} {lastName}!
        </h1>
        <h2>Subject: {subject}</h2>
        <p>{body}</p>
        <p>From: {sender}</p>
        <p>To: {recipient}</p>
    </div>
)

export default EmailTemplate
