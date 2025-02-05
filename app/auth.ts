import {UserRole} from '@/types/roles';
import {useAuth} from '@clerk/nextjs';
import {auth, clerkClient} from '@clerk/nextjs/server';

export async function getUser(supabase: unknown) {
  const {userId} = useAuth();
  if (!userId) {
    return null;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user;
}

export async function getUserRole(): Promise<UserRole | null> {
  const {userId} = await auth();
  if (!userId) {
    return null;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const metadata = user.privateMetadata as {role?: UserRole};
  return metadata.role || 'USER';
}

export async function setUserRole(userId: string, role: UserRole) {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    privateMetadata: {role},
  });
}

export async function getUserDetails(supabase: any) {
  const {data, error} = await supabase.from('profiles').select('*').maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function getSubscription(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('*').maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function getSubscriptionStatus(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('status').maybeSingle();

  if (error) throw new Error(error.message);

  return data?.status;
}

export async function getSubscriptionPriceId(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('price_id').maybeSingle();

  if (error) throw new Error(error.message);

  return data?.price_id;
}

export async function getSubscriptionTrialEnd(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('trial_ends_at').maybeSingle();

  if (error) throw new Error(error.message);

  return data?.trial_ends_at;
}

export async function getSubscriptionCustomerId(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('customer_id');

  if (error) throw new Error(error.message);

  return data?.customer_id;
}

export async function getSubscriptionProductId(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('product_id');

  if (error) throw new Error(error.message);

  return data?.product_id;
}

export async function getSubscriptionPrice(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('price');

  if (error) throw new Error(error.message);

  return data?.price;
}

export async function getSubscriptionInterval(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('interval');

  if (error) throw new Error(error.message);

  return data?.interval;
}

export async function getSubscriptionCurrentPeriodEnd(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('current_period_end');

  if (error) throw new Error(error.message);

  return data?.current_period_end;
}

export async function getSubscriptionCurrentPeriodStart(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('current_period_start');

  if (error) throw new Error(error.message);

  return data?.current_period_start;
}

export async function getSubscriptionCancelAtPeriodEnd(supabase: any) {
  const {data, error} = await supabase.from('subscriptions').select('cancel_at_period_end');

  if (error) throw new Error(error.message);

  return data?.cancel_at_period_end;
}
