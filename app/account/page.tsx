import {getSubscription, getUser, getUserDetails} from '../auth';
import CustomerPortalForm from '@/components/forms/CustomerPortalForm';
import EmailForm from '@/components/forms/EmailForm';
import NameForm from '@/components/forms/NameForm';
import {createClient} from '@/utils/supabase/server';
import {redirect} from 'next/navigation';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
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
