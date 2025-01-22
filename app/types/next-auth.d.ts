// types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    subscriptionStatus?: string | null;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      stripeCustomerId?: string | null;
      stripeSubscriptionId?: string | null;
      subscriptionStatus?: string | null;
    } & DefaultSession["user"];
  }
}
