import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function createContext(opts?: CreateNextContextOptions) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    supabase,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    });
  }
  return next({
    ctx: {
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);