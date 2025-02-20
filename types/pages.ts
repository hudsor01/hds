export interface ContactFormProps {
    onSubmit: (data: ContactFormData) => void
}

export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}
