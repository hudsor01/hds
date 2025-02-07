'use client'
import CustomerPortalForm from '@/components/forms/CustomerPortalForm'
import EmailForm from '@/components/forms/EmailForm'
import NameForm from '@/components/forms/NameForm'
import { supabase } from '@/lib/db'
import { getSubscription, getUser } from '@/utils/supabase/server'
import type { SupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import React from 'react'
import type { Database } from '../../types/database.types'

const AccountPage: React.FC = async () => {
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    userDetails(supabase),
    getSubscription(supabase),
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <section className='mb-32 bg-black'>
      <div className='max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8'>
        <div className='sm:align-center sm:flex sm:flex-col'>
          <h1 className='text-4xl font-extrabold text-white sm:text-center sm:text-6xl'>Account</h1>
          <p className='max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl'>
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className='p-4'>
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ''} />
        <EmailForm userEmail={(user.unsafeMetadata as Record<string, string>)?.email ?? ''} />
      </div>
    </section>
  );
}

export default AccountPage;

function getUser (supabase: SupabaseClient<Database, "public", any>): any
{
  throw new Error('Function not implemented.')
}
