import {useSession} from '@clerk/nextjs';

export function useAuth() {
  const {isLoaded, isSignedIn, session} = useSession();
  const isLoading = !isLoaded;
  const isAuthenticated = isSignedIn;

  return {
    session: session as unknown as typeof useSession | null,
    status: isLoaded ? (isSignedIn ? 'authenticated' : 'unauthenticated') : 'loading',
    isLoading,
    isAuthenticated,
  };
}
