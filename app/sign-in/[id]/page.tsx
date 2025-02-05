'use client';

import {EmailSignIn} from '@/components/auth/email-sign-in';
import {PasswordSignIn} from '@/components/auth/password-sign-in';
import {SignUp} from '@/components/auth/sign-up';
import {ForgotPassword} from '@/components/forms/auth/forgot-password';
import {OauthSignIn} from '@/components/forms/auth/oauth-sign-in';
import {UpdatePassword} from '@/components/forms/auth/update-password';
import Logo from '@/components/icons/Logo';
import {Card} from '@/components/ui/cards/card';
import {Separator} from '@/components/ui/separator';
import {createClient} from '@/lib/db';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

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
  params: {id: string};
  searchParams: {disable_button: boolean};
}) {
  const authConfig = getAuthConfig();
  const supabase = createClient();

  // Validate and set view type
  let viewType: ViewType;
  if (VIEW_TYPES.includes(params.id as ViewType)) {
    viewType = params.id as ViewType;
  } else {
    const preferredView = (await cookies()).get('preferredSignInView')?.value || null;
    viewType = getDefaultView(preferredView);
    return redirect(`/signin/${viewType}`);
  }

  // Check authentication status
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (user && viewType !== 'update_password') {
    return redirect('/');
  } else if (!user && viewType === 'update_password') {
    return redirect('/signin');
  }

  return (
    <div className='flex justify-center height-screen-helper'>
      <div className='flex flex-col justify-between max-w-lg p-3 m-auto w-80'>
        <div className='flex justify-center pb-12'>
          <Logo width='64px' height='64px' />
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
          {viewType === 'password_signin' && <PasswordSignIn allowEmail={authConfig.allowEmail} />}
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
          {viewType === 'signup' && <SignUp allowEmail={authConfig.allowEmail} />}
          {viewType !== 'update_password' && viewType !== 'signup' && authConfig.allowOauth && (
            <>
              <Separator text='Third-party sign-in' />
              <OauthSignIn />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
