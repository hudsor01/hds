'use server';

import { clerkClient } from '@clerk/nextjs/server';

export async function createOrganization(name: string) {
  const organization = await clerkClient.organizations.createOrganization({
    name: name,
  });

  return organization;
}
