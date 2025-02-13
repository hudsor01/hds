'use client'
import { Forms } from '@/types'

export default function NameForm({ userName, userId }: Forms.NameFormProps) {
  return (
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        id="name"
        type="text"
        value={userName}
        readOnly
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  )
}
