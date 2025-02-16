import { forgotPasswordAction } from '@/app/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import Link from 'next/link'
import { SmtpMessage } from '../smtp-message'
import { JSX } from 'react'

/**
 * ForgotPassword component renders a form for users to reset their password.
 *
 * @param props - The properties object.
 * @param props.searchParams - A promise that resolves to a Message object containing search parameters.
 *
 * @returns A JSX element representing the forgot password form.
 */
export default async function ForgotPassword(props: { searchParams: Promise<Message> }): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  return (
    <>
      <form className="text-foreground mx-auto flex w-full max-w-64 min-w-64 flex-1 flex-col gap-2 [&>input]:mb-6">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-secondary-foreground text-sm">
            Already have an account?{' '}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>Reset Password</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  )
}
