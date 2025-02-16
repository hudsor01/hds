'use client'

import * as React from 'react'
import { VerificationWrapper } from '@/components/auth/verification-wrapper'
import { VerificationForm } from '@/components/auth/verification-form'
import { Phone as PhoneIcon } from '@mui/icons-material'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/utils/supabase/client'

export default function PhoneVerificationPage() {
  const supabase = createClient()
  const { toast } = useToast()

  const handleVerification = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' }
    })

    if (error) throw error
  }

  return (
    <VerificationWrapper>
      <VerificationForm
        title="Add Phone Number"
        description="Add a phone number to enhance your account security"
        icon={<PhoneIcon />}
        onSubmit={handleVerification}
        type="phone"
        inputProps={{
          placeholder: '+12345678900',
          helperText: 'Enter phone number in E.164 format (e.g., +12345678900)'
        }}
      />
    </VerificationWrapper>
  )
}
