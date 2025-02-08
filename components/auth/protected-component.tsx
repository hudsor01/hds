'use client';

export function ProtectedComponent() {
  const { isLoaded, isSignedIn, userId } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view this content</div>;
  }

  return (
    <div>
      <h2>Protected Content</h2>
      <p>User ID: {userId}</p>
    </div>
  );
}
