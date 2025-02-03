import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const authData = await auth();
    if (!authData.userId) {
      return authData.redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  const authData = await auth();
  if (!authData.userId) {
    // Handle unauthenticated case, e.g., redirect or throw an error
    throw new Error("User not authenticated");
  }

  // Role assignment logic
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(authData.userId);
  const metadata = user.privateMetadata as { role?: string };

  if (!metadata.role) {
   clerk.users.updateUserMetadata(authData.userId, {
      privateMetadata: { ...metadata, role: "OWNER" },
    });
  }
});
