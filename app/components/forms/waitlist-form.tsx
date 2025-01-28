'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

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
      <div className="bg-[#A7C7E7]/10 p-8 rounded-2xl text-center space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Thank you for joining!</h3>
        <p className="text-gray-600">
          We'll notify you when we launch. Get ready to transform your property management.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            name="name"
            placeholder="Your name"
            className="h-12 bg-white/50 border-[#A7C7E7]/20 focus:border-[#A7C7E7] transition-colors"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Your email"
            className="h-12 bg-white/50 border-[#A7C7E7]/20 focus:border-[#A7C7E7] transition-colors"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
          )}
        </div>
      </div>
      <Input
        name="company"
        placeholder="Company (optional)"
        className="h-12 bg-white/50 border-[#A7C7E7]/20 focus:border-[#A7C7E7] transition-colors"
        onChange={formik.handleChange}
        value={formik.values.company}
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full h-12 bg-[#A7C7E7] hover:bg-[#87B3D9] text-white font-medium transition-colors"
      >
        {formik.isSubmitting ? 'Joining...' : 'Join the Waitlist'}
      </Button>
    </form>
  )
}
