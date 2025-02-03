const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${BASE_URL}/auth/verify?token=${token}`;

  // TODO: Implement your email sending logic here
  // For development, we'll just log the link
  console.log('Verification link:', confirmLink);
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${BASE_URL}/auth/reset-password?token=${token}`;

  // TODO: Implement your email sending logic here
  // For development, we'll just log the link
  console.log('Password reset link:', resetLink);
}
