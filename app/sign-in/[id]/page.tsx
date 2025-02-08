'use client';

import { EmailSignIn } from '@/components/forms/auth/email-sign-in';
import { ForgotPassword } from '@/components/auth/forgot-password';
import { OauthSignIn } from '@/components/auth/oauth-sign-in';
import { PasswordSignIn } from '@/components/forms/auth/password-sign-in';
import { SignUp } from '@/components/forms/auth/sign-up';
import { UpdatePassword } from '@/components/auth/update-password';
import Logo from '@/components/icons/Logo';
import { Card } from '@/components/ui/cards/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Define view types as a constant
const VIEW_TYPES = [
  'password_signin',
  'email_signin',
  'forgot_password',
  'update_password',
  'signup',
] as const;
type ViewType = (typeof VIEW_TYPES)[number];

// Define auth configuration type
interface AuthConfig {
  allowOauth: boolean;
  allowEmail: boolean;
  allowPassword: boolean;
}

function getAuthConfig(): AuthConfig {
  return {
    allowOauth: true,
    allowEmail: true,
    allowPassword: true,
  };
}

function getDefaultView(preferredView: string | null): ViewType {
  if (preferredView && VIEW_TYPES.includes(preferredView as ViewType)) {
    return preferredView as ViewType;
  }
  return 'password_signin';
}

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const authConfig = getAuthConfig();
  const supabase = createClient();

  // Validate and set view type
  let viewType: ViewType;
  if (VIEW_TYPES.includes(params.id as ViewType)) {
    viewType = params.id as ViewType;
  } else {
    const preferredView =
      (await cookies()).get('preferredSignInView')?.value || null;
    viewType = getDefaultView(preferredView);
    return redirect(`/signin/${viewType}`);
  }

  // Check authentication status
  const {
    data: { user },
  } = await supabase.auth.getCurrentUser();

  if (user && viewType !== 'update_password') {
    return redirect('/');
  } else if (!user && viewType === 'update_password') {
    return redirect('/signin');
  }

  return (
    <div className="height-screen-helper flex justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3">
        <div className="flex justify-center pb-12">
          <Logo width="64px" height="64px" />
        </div>
        <Card
          title={
            viewType === 'forgot_password'
              ? 'Reset Password'
              : viewType === 'update_password'
                ? 'Update Password'
                : viewType === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'
          }
        >
          {viewType === 'password_signin' && (
            <PasswordSignIn allowEmail={authConfig.allowEmail} />
          )}
          {viewType === 'email_signin' && (
            <EmailSignIn
              allowPassword={authConfig.allowPassword}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewType === 'forgot_password' && (
            <ForgotPassword
              allowEmail={authConfig.allowEmail}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewType === 'update_password' && <UpdatePassword />}
          {viewType === 'signup' && (
            <SignUp allowEmail={authConfig.allowEmail} />
          )}
          {viewType !== 'update_password' &&
            viewType !== 'signup' &&
            authConfig.allowOauth && (
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn />
              </>
            )}
        </Card>
      </div>
    </div>
  );
}
