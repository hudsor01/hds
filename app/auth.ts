import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default clerkMiddleware(
  (auth, req) => {
    // Public routes
    auth().protect();

    // AfterAuth logic
    if (!auth().userId && !auth().isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Role assignment logic
    if (auth().userId) {
      try {
        const user = await clerkClient.users.getUser(auth().userId);
        const metadata = user.privateMetadata as { role?: string };

        if (!metadata.role) {
          await clerkClient.users.updateUserMetadata(auth().userId, {
            privateMetadata: { ...metadata, role: "OWNER" },
          });
        }
      } catch (error) {
        console.error("Error setting user role:", error);
      }
    }
  },
  {
    // Other middleware options
  }
);
