'use client'

import * as React from 'react'
import { VerificationWrapper } from '@/components/auth/verification-wrapper'
import { VerificationForm } from '@/components/auth/verification-form'
import { Email as EmailIcon } from '@mui/icons-material'
import { createClient } from '@/utils/supabase/client'

export default function EmailAdditionPage() {
  const supabase = createClient()

  const handleVerification = async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email })
    if (error) throw error
  }

  return (
    <VerificationWrapper>
      <VerificationForm
        title="Add Email Address"
        description="Add an additional email address to your account"
        icon={<EmailIcon />}
        onSubmit={handleVerification}
        type="email"
        inputProps={{
          type: 'email',
          placeholder: 'Enter your email address'
        }}
      />
    </VerificationWrapper>
  )
}
