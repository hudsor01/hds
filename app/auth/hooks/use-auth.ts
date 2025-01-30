import { useSession } from '@clerk/nextjs';
import { Session } from '@prisma/client';

export function useAuth() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  return {
    session: session as Session | null,
    status,
    isLoading,
    isAuthenticated,
    user: session?.user,
  };
}
