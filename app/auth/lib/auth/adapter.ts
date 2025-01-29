import { Adapter, AdapterUser } from 'next-auth/adapters';

import { prisma } from '@/lib/prisma';

export function CustomAdapter(): Adapter {
  return {
    createUser: async (data: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
      if (!data.email) {
        throw new Error('User email is required');
      }

      const authUser = await prisma.authUser.create({
        data: {
          email: data.email,
          email_confirmed_at: data.emailVerified,
          raw_user_meta_data: {
            name: data.name ?? null,
            image: data.image ?? null,
          },
          encrypted_password: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      const user = await prisma.user.create({
        data: {
          id: authUser.id,
          email: data.email,
          name: data.name ?? null,
          emailVerified: data.emailVerified ?? null,
          image: data.image ?? null,
          stripe_customer_id: null,
          stripe_subscription_id: null,
          subscription_status: null,
          trial_ends_at: null,
        },
      });

      return {
        id: user.id,
        email: user.email!,
        emailVerified: user.emailVerified,
        name: user.name ?? null,
        image: user.image ?? null,
      };
    },

    getUser: async (id): Promise<AdapterUser | null> => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user || !user.email) return null;

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name ?? null,
        image: user.image ?? null,
      };
    },

    getUserByEmail: async (email): Promise<AdapterUser | null> => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.email) return null;

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name ?? null,
        image: user.image ?? null,
      };
    },

    getUserByAccount: async ({ providerAccountId, provider }): Promise<AdapterUser | null> => {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: { user: true },
      });

      if (!account?.user?.email) return null;

      return {
        id: account.user.id,
        email: account.user.email,
        emailVerified: account.user.emailVerified,
        name: account.user.name ?? null,
        image: account.user.image ?? null,
      };
    },

    updateUser: async ({ id, ...data }): Promise<AdapterUser> => {
      const user = await prisma.user.update({
        where: { id },
        data,
      });

      if (!user.email) {
        throw new Error('User email is required');
      }

      // Keep auth_users table in sync
      await prisma.authUser.update({
        where: { id },
        data: {
          email: data.email,
          email_confirmed_at: data.emailVerified,
          raw_user_meta_data: {
            name: data.name,
            image: data.image,
          },
          updated_at: new Date(),
        },
      });

      return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name ?? null,
        image: user.image ?? null,
      };
    },

    deleteUser: async userId => {
      await prisma.user.delete({
        where: { id: userId },
      });
      await prisma.authUser.delete({
        where: { id: userId },
      });
    },

    linkAccount: async (data: any) => {
      await prisma.account.create({
        data,
      });
    },

    unlinkAccount: async ({ providerAccountId, provider }) => {
      await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });
    },

    createSession: async data => {
      return prisma.session.create({
        data,
      });
    },

    getSessionAndUser: async sessionToken => {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!session?.user?.email) return null;

      return {
        session,
        user: {
          id: session.user.id,
          email: session.user.email,
          emailVerified: session.user.emailVerified,
          name: session.user.name ?? null,
          image: session.user.image ?? null,
        },
      };
    },

    updateSession: async data => {
      return prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      });
    },

    deleteSession: async sessionToken => {
      await prisma.session.delete({
        where: { sessionToken },
      });
    },
  };
}
