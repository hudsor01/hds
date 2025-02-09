'use client'

interface EmailFormProps {
  userEmail: string
}

export default function EmailForm({ userEmail }: EmailFormProps) {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={userEmail}
        readOnly
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  )
}
