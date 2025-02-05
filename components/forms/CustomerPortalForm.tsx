'use client';

interface CustomerPortalFormProps {
  subscription: any; // Replace with a proper type if available.
}

export default function CustomerPortalForm({subscription}: CustomerPortalFormProps) {
  return (
    <div className='p-4 border rounded-md bg-white'>
      <h2 className='text-lg font-bold'>Customer Portal</h2>
      <p>{subscription ? 'Subscription Active' : 'No active subscription'}</p>
    </div>
  );
}
