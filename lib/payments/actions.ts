'use server';

import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { withTeam } from '@/lib/auth/middleware';
import { redirect } from 'next/navigation';

export async function checkoutAction(formData: FormData) {
  return (
    await withTeam(async (data, team) => {
      const priceId = data.get('priceId') as string;
      createCheckoutSession({ team: team, priceId });
    })
  )(formData);
}

export async function customerPortalAction(formData: FormData) {
  return (
    await withTeam(async (_, team) => {
      const portalSession = await createCustomerPortalSession(team);
      redirect(portalSession.url);
    })
  )(formData);
}
