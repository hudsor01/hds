import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-orange-500 hover:bg-orange-600',
          footerActionLink: 'text-orange-500 hover:text-orange-600',
        },
      }}
    />
  );
}
