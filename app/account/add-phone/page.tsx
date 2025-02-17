'use client'

import * as React from 'react'
import { VerificationWrapper } from '@/components/features/auth/verification-wrapper'
import { VerificationForm } from '@/components/features/auth/verification-form'
import { Phone as PhoneIcon } from '@mui/icons-material'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/auth'

export default function PhoneVerificationPage() {
  const { toast } = useToast()

  const handleVerification = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' }
    })

    if (error) {
      toast({ title: 'Error', description: error.message, type: 'error' })
      throw error
    } else {
      toast({ title: 'Success', description: 'Verification code sent!', type: 'success' })
    }
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
