'use client'
import { CustomerPortalFormProps } from '@/types/forms'

export default function CustomerPortalForm({ subscription }: CustomerPortalFormProps) {
  return (
    <div className="rounded-md border bg-white p-4">
      <h2 className="text-lg font-bold">Customer Portal</h2>
      <p>{subscription ? 'Subscription Active' : 'No active subscription'}</p>
    </div>
  )
}
