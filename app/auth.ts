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

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  // Role assignment logic
  if (auth().userId) {
    try {
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(auth().userId);
      const metadata = user.privateMetadata as { role?: string };

      if (!metadata.role) {
       clerk.users.updateUserMetadata(auth().userId, {
          privateMetadata: { ...metadata, role: "OWNER" },
        });
      }
    } catch (error) {
      console.error("Error setting user role:", error);
    }
  }
});
