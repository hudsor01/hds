'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import SendIcon from '@mui/icons-material/Send'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z
        .string()
        .min(5, 'Subject must be at least 5 characters'),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(
        null
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setSubmitError(null)
        setSubmitSuccess(false)

        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
            setSubmitSuccess(true)
            reset()
        } catch (error) {
            setSubmitError(
                'Failed to send message. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {submitSuccess && (
                <Alert severity="success" className="mb-4">
                    Message sent successfully! We&apos;ll get back to
                    you soon.
                </Alert>
            )}

            {submitError && (
                <Alert severity="error" className="mb-4">
                    {submitError}
                </Alert>
            )}

            <TextField
                {...register('name')}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                className="bg-background"
            />

            <TextField
                {...register('email')}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                className="bg-background"
            />

            <TextField
                {...register('subject')}
                label="Subject"
                variant="outlined"
                fullWidth
                error={!!errors.subject}
                helperText={errors.subject?.message}
                className="bg-background"
            />

            <TextField
                {...register('message')}
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
                className="bg-background"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                endIcon={
                    isSubmitting ? (
                        <CircularProgress size={20} />
                    ) : (
                        <SendIcon />
                    )
                }
                className="w-full"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    )
}
