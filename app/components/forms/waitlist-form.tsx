'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

// Add fetch import
import { fetch } from 'next/dist/compiled/node-fetch'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  company: Yup.string()
    .optional()
})

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      company: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to join waitlist')
        }

        setIsSubmitted(true)
        resetForm()
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setSubmitting(false)
      }
    }
  })

  if (isSubmitted) {
    return (
      <div className="bg-[#A7C7E7]/10 p-6 rounded-lg">
        <p className="text-lg font-display text-gray-900">
          Thank you for joining our waitlist!
        </p>
        <p className="mt-2 font-body text-gray-600">
          We'll notify you when we launch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full font-body"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full font-body"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <Input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full font-body"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#A7C7E7] hover:bg-[#87B3D9] text-white font-sans"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  )
}
