'use client';

import * as React from 'react';
import { useUser } from '../../auth/lib/auth/config';
import { supabase } from '../../../lib/supabase';

export default function Page() {
  const { user, loading } = useUser();
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);

  if (loading) return null;

  if (!user?.id) {
    return <p>You must be logged in to access this page</p>;
  }

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Add email to user's profile in Supabase
      const { error } = await supabase.auth.updateUser({
        email: email,
      });

      if (error) throw error;

      // Set to true to display second form
      // and capture the OTP code
      setIsVerifying(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification code
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (error) throw error;
      setSuccessful(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a success message if the email was added successfully
  if (successful) {
    return (
      <>
        <h1>Email added!</h1>
      </>
    );
  }

  // Display the verification form to capture the OTP code
  if (isVerifying) {
    return (
      <>
        <h1>Verify email</h1>
        <div>
          <form onSubmit={e => verifyCode(e)}>
            <div>
              <label htmlFor="code">Enter code</label>
              <input
                onChange={e => setCode(e.target.value)}
                id="code"
                name="code"
                type="text"
                value={code}
              />
            </div>
            <div>
              <button type="submit">Verify</button>
            </div>
          </form>
        </div>
      </>
    );
  }

  // Display the initial form to capture the email address
  return (
    <>
      <h1>Add Email</h1>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Enter email address</label>
            <input
              onChange={e => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
            />
          </div>
          <div>
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  );
}
